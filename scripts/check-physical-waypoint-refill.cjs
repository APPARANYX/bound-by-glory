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
/* A completed empty physical queue is not an active route: a fixed five-second
   refresh must not rebuild it unless the destination, geometry, claims or
   moving-obstacle fallback says the same position needs reconsideration. */
const arrived={id:'settled-probe',root:{position:{x:40,y:0,z:40}}},stop={x:40,z:40};
sim.time=1;
N.nextWaypoint(sim,arrived,stop);
let completed=arrived._physicalPath;
assert(completed&&!completed.blocked&&completed.points.length===0,'arrived soldier owns a settled empty route');
sim.time=61;
N.nextWaypoint(sim,arrived,stop);
assert.strictEqual(arrived._physicalPath,completed,'elapsed time alone cannot replan an already completed empty route');
const other={x:42,z:40};
N.nextWaypoint(sim,arrived,other);
assert.notStrictEqual(arrived._physicalPath,completed,'new destination must invalidate completed route');
let revision=5;
r.BattleTacticalPositions={revision(){return revision;},station(){return null;},current(){return null;}};
sim.time=62;
N.nextWaypoint(sim,arrived,stop);
completed=arrived._physicalPath;
sim.time=90;
N.nextWaypoint(sim,arrived,stop);
assert.strictEqual(arrived._physicalPath,completed,'unchanged station revision retains an arrived route');
revision++;
N.nextWaypoint(sim,arrived,stop);
assert.notStrictEqual(arrived._physicalPath,completed,'station claim changes must reconsider an arrived stand goal');
completed=arrived._physicalPath;
sim.obstacles.__dynamicFootprints=[{id:'distant-hull',shape:'circle',x:1000,z:1000,radius:2}];
sim.time=97;
N.nextWaypoint(sim,arrived,stop);
assert.notStrictEqual(arrived._physicalPath,completed,'moving-hull presence retains bounded periodic replan');
delete sim.obstacles.__dynamicFootprints;
/* Subthreshold changes still get their old scheduled review; do not let a
   completed-route shortcut permanently ignore a new final position. */
const drifting={id:'drift-probe',root:{position:{x:55,y:0,z:55}}},driftGoal={x:55,z:55};
sim.time=100;
N.nextWaypoint(sim,drifting,driftGoal);
const beforeDrift=drifting._physicalPath;
sim.time=101;
N.nextWaypoint(sim,drifting,{x:55.5,z:55});
assert.strictEqual(drifting._physicalPath,beforeDrift,'small goal drift preserves the existing plan until periodic review');
sim.time=106;
N.nextWaypoint(sim,drifting,{x:55.5,z:55});
assert.notStrictEqual(drifting._physicalPath,beforeDrift,'small goal drift still receives scheduled full replan');
sim.time=90;

console.log('PASS: completed empty waypoint queues skip periodic rebuild, but invalidate on goal, station and moving obstacles');
console.log('PASS: low rolling waypoint queues refill in place without a full physical replan');
