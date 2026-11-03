#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const REPO=path.resolve(__dirname,'..');
const quiet={log(){},warn(){},error(){}};
function load(root,rel){const c=fs.readFileSync(path.join(REPO,rel),'utf8');new Function('window','globalThis','console','BABYLON',c+'\n//# sourceURL='+rel)(root,root,quiet,root.BABYLON);}
const r={console:quiet};r.window=r;
r.BABYLON={Color3:function(){},MeshBuilder:{CreateLines:()=>({dispose(){}}),CreateSphere:()=>({position:{set(){}},dispose(){}})},StandardMaterial:function(){}};
r.BattleModules={systems:{},registerSystem(id,s){s.id=id;this.systems[id]=s;},getSystem(id){return this.systems[id];},listSystems(){return Object.values(this.systems);}};
load(r,'battle/core-runtime.js');
load(r,'battle/battle-navigation.js');
load(r,'battle/modules/39-navigation-physicality-debug.js');
const N=r.BattleNavigation,scenario={buildings:[]};
N.installScenario(scenario);
const sim={time:0,heightAt:()=>0,obstacles:[],_roster:{us:[],ge:[]},scene:{metadata:{battleScenario:scenario}}};
r.BattleModules.getSystem('navigation-physicality-debug').onBattleStart(sim);
const soldier={id:'refill-probe',root:{position:{x:0,y:0,z:0}}},goal={x:0,z:180};
let waypoint=N.nextWaypoint(sim,soldier,goal),plan=soldier._physicalPath;
assert(plan&&plan.points.length>=4,'initial rolling plan should contain a useful lookahead queue');
const pointsArray=plan.points,startZ=soldier.root.position.z;
for(let i=0;i<4;i++){
  soldier.root.position.x=waypoint.x;soldier.root.position.z=waypoint.z;sim.time+=.15;
  waypoint=N.nextWaypoint(sim,soldier,goal);
  assert.strictEqual(soldier._physicalPath,plan,'consuming the rolling queue must refill rather than replace the physical plan');
  assert.strictEqual(plan.points,pointsArray,'refill must extend the committed queue in place');
}
assert(Math.abs(soldier.root.position.z-startZ)>35,'probe must consume enough lookahead to cross the old low-queue rebuild threshold');
assert(sim.time<plan.replanAt,'probe must exercise queue refill before the bounded periodic replan');
assert.equal(plan.finalGoalX,goal.x);assert.equal(plan.finalGoalZ,goal.z);

/* A previously cleared static straight segment remains clear along its forward
   subsegments only. Any off-line position, claim revision, moving obstacle
   or changed waypoint must require the full live physical clearance again. */
const certSoldier={id:'cert-probe',root:{position:{x:0,y:0,z:0}}},certGoal={x:0,z:80};
sim.time=1;
N.nextWaypoint(sim,certSoldier,certGoal);
const certPlan=certSoldier._physicalPath;
sim.time=1.15;
N.nextWaypoint(sim,certSoldier,certGoal);
const cert1=certPlan.segmentClear;
assert(cert1&&cert1.point===certPlan.points[0],'first revisit must certify the live segment');
certSoldier.root.position.z=2;
sim.time=1.3;
N.nextWaypoint(sim,certSoldier,certGoal);
assert.strictEqual(certPlan.segmentClear,cert1,'forward collinear travel reuses validated corridor');
certSoldier.root.position.x=0.1;
sim.time=1.45;
N.nextWaypoint(sim,certSoldier,certGoal);
const cert2=certPlan.segmentClear;
assert(cert2&&cert2!==cert1,'lateral deviation must recheck the physical segment');
let certRevision=0;
r.BattleTacticalPositions={current(){return null;},station(){return null;},revision(){return certRevision;}};
certRevision++;
sim.time=1.6;
N.nextWaypoint(sim,certSoldier,certGoal);
const cert3=certPlan.segmentClear;
assert(cert3&&cert3!==cert2,'changed live station claim forces revalidation');
sim.obstacles.__dynamicFootprints=[{id:'hull',shape:'circle',x:800,z:800,radius:2}];
sim.time=1.75;
N.nextWaypoint(sim,certSoldier,certGoal);
assert(certPlan.segmentClear!==cert3,'moving hull presence must bypass static-segment certificate');
delete sim.obstacles.__dynamicFootprints;
console.log('PASS: low rolling waypoint queues refill in place without a full physical replan');
