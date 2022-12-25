class Triangle{constructor(t,e){this.maxLength=.3,this.minLength=.1,this.rank=t,this.totalCenter=e,this.angleSpeed=getRandomFromInterval(-.001,.001),this.buffer=createGraphics(DOMINANTSIDE*this.maxLength,DOMINANTSIDE*this.maxLength),this.pattern=!0,this.lengthB=DOMINANTSIDE*getRandomFromInterval(this.minLength,this.maxLength),this.lengthC=DOMINANTSIDE*getRandomFromInterval(this.minLength,this.maxLength),this.color=getRandomFromList(PALETTE.pixelColors),this.colorStroke=color("#323232"),this.center=createVector(this.buffer.width/2,this.buffer.height/2),this.pos=createVector(getRandomFromInterval(this.buffer.width/2,width-this.buffer.width/2),getRandomFromInterval(this.buffer.height/2,height-this.buffer.height/2)),this.radius=p5.Vector.dist(this.totalCenter,this.pos),this.angleTotalCenter=p5.Vector.sub(this.totalCenter,this.pos).heading(),this.angleDyn=this.angleTotalCenter,this.A=createVector(this.buffer.width/2,this.buffer.height),this.angle=p5.Vector.sub(this.center,this.A).heading(),this.theta=this.angle-PI/18,this.gamma=this.angle+PI/18,this.B=p5.Vector.fromAngle(this.theta,this.lengthB).add(this.A),this.C=p5.Vector.fromAngle(this.gamma,this.lengthC).add(this.A),this.coords=[[this.A.x,this.A.y],[this.B.x,this.B.y],[this.C.x,this.C.y]],this.create()}createLines(){this.spotLengthy=.003*DOMINANTSIDE,this.ABAngle=p5.Vector.sub(this.B,this.A).heading(),this.ACAngle=p5.Vector.sub(this.C,this.A).heading(),this.ABSpot1=p5.Vector.add(this.A,p5.Vector.fromAngle(this.ABAngle+PI/2,this.spotLengthy)),this.ABSpot2=p5.Vector.sub(this.A,p5.Vector.fromAngle(this.ABAngle+PI/2,this.spotLengthy)),this.ABSpot3=p5.Vector.add(this.B,p5.Vector.fromAngle(this.ABAngle+PI/2,this.spotLengthy)),this.ABSpot4=p5.Vector.sub(this.B,p5.Vector.fromAngle(this.ABAngle+PI/2,this.spotLengthy)),this.ACSpot1=p5.Vector.add(this.A,p5.Vector.fromAngle(this.ACAngle+PI/2,this.spotLengthy)),this.ACSpot2=p5.Vector.sub(this.A,p5.Vector.fromAngle(this.ACAngle+PI/2,this.spotLengthy)),this.ACSpot3=p5.Vector.add(this.C,p5.Vector.fromAngle(this.ACAngle+PI/2,this.spotLengthy)),this.ACSpot4=p5.Vector.sub(this.C,p5.Vector.fromAngle(this.ACAngle+PI/2,this.spotLengthy)),this.lines=[[this.ABSpot1.x,this.ABSpot1.y],[this.ABSpot2.x,this.ABSpot2.y],[this.ABSpot3.x,this.ABSpot3.y],[this.ABSpot4.x,this.ABSpot4.y],[this.ACSpot1.x,this.ACSpot1.y],[this.ACSpot2.x,this.ACSpot2.y],[this.ACSpot3.x,this.ACSpot3.y],[this.ACSpot4.x,this.ACSpot4.y]]}debug(){this.buffer.push(),this.buffer.stroke("#4c8137"),this.buffer.strokeWeight(50),this.buffer.point(this.A.x,this.A.y),this.buffer.stroke("#ad7f7f"),this.buffer.point(this.B.x,this.B.y),this.buffer.stroke("#14195e"),this.buffer.point(this.C.x,this.C.y),this.buffer.push(),this.buffer.stroke("#ff1bff"),this.buffer.strokeWeight(50),this.buffer.point(this.center.x,this.center.y),this.buffer.pop()}update(){this.angleDyn+=this.angleSpeed,this.pos=p5.Vector.add(createVector(this.radius*sin(this.angleDyn),this.radius*cos(this.angleDyn)),this.totalCenter),this.angleTotalCenter=p5.Vector.sub(this.totalCenter,this.pos).heading()}create(){this.buffer.push(),this.buffer.stroke("#323232"),this.buffer.strokeWeight(3),this.buffer.fill(this.color),this.buffer.beginShape(),this.buffer.vertex(this.A.x,this.A.y),this.buffer.vertex(this.B.x,this.B.y),this.buffer.vertex(this.C.x,this.C.y),this.buffer.endShape(CLOSE),this.buffer.pop()}}class TriangleSystem{constructor(){this.triangleCount=TRIANGLECOUNT,this.triangleTemplateCount=20,this.PopselTextureCount=1,this.bufferCount=GEARBUFFERCOUNT,this.triangles=[],this.triangleTemplates=[],this.textures=[],this.pupselGridsPixel=[],this.buffers=[],this.bufferRotations=[],this.bufferRotationSpeed=[],this.totalCenter=createVector(width/2+getRandomFromInterval(.05*-DOMINANTSIDE,.05*DOMINANTSIDE),height/2+getRandomFromInterval(.05*-DOMINANTSIDE,.05*DOMINANTSIDE));for(var t=0;t<this.bufferCount;t++)this.buffers.push(createGraphics(width,height)),this.bufferRotations.push(0),this.bufferRotationSpeed.push(getRandomFromList([-1e-4,-2e-4,-3e-4,-5e-4,1e-4,2e-4,3e-4,5e-4]));for(t=0;t<this.triangleCount;t++)this.triangles.push(new Triangle(t,this.totalCenter));for(t=0;t<this.triangleTemplateCount;t++)this.triangleTemplates[t]=new PopselTexture(this.triangles[t]).buffer;for(t=0;t<this.triangles.length;t++)this.triangles[t].buffer=getRandomFromList(this.triangleTemplates);this.create()}debug(){for(var t=0;t<this.triangles.length;t++);push(),stroke("black"),strokeWeight(50),point(this.totalCenter.x,this.totalCenter.y),pop()}create(){for(var t=0;t<this.triangles.length;t++){this.triangles[t].update();var e=getRandomFromList(this.buffers);e.push(),e.imageMode(CENTER),e.translate(this.triangles[t].pos.x,this.triangles[t].pos.y),e.rotate(this.triangles[t].angleTotalCenter-PI/2),e.image(this.triangles[t].buffer,0,0),e.pop()}}show(){for(var t=0;t<triangleSystem.buffers.length;t++)push(),imageMode(CENTER),triangleSystem.bufferRotations[t]+=triangleSystem.bufferRotationSpeed[t],translate(this.totalCenter.x,this.totalCenter.y),rotate(triangleSystem.bufferRotations[t]),image(triangleSystem.buffers[t],0,0),pop()}insidePolygon(t,e,s){for(var i,h=0;h<this.triangles.length;h++)if(insidePolygon([t,e],this.triangles[h].coords))return i=brightenSuperNew(this.triangles[h].color,map(p5.Vector.dist(createVector(t,e),this.triangles[h].A),0,this.triangles[h].distance,-50,50)),this.triangles[h].pattern,{color:i,rank:h}}}