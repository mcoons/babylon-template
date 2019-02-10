window.onload = function(){
    var canvas = document.getElementById("canvas");
 
    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon is supported
        var engine = new BABYLON.Engine(canvas, true);
        var scene = createScene(engine);
 
        engine.runRenderLoop(function () {
            // updateScene());
            scene.render();
        });
 
        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    } 
};

var createScene = function (engine) {
    var showAxis = true;
    var showBox = true;

    var scene  = new BABYLON.Scene(engine);
    
    // Create four cameras
    // Parameters: camera, alpha(x), beta(y), radius, target position, scene
	var camera1 = new BABYLON.ArcRotateCamera("camera1",  1 * Math.PI / 2, 7 * Math.PI / 16, 25, new BABYLON.Vector3(0, 0, 0), scene);
    var camera2 = new BABYLON.ArcRotateCamera("camera2",  2 * Math.PI / 2, 7 * Math.PI / 16, 25, new BABYLON.Vector3(0, 0, 0), scene);
    var camera3 = new BABYLON.ArcRotateCamera("camera3",  3 * Math.PI / 2, 7 * Math.PI / 16, 25, new BABYLON.Vector3(0, 0, 0), scene);
    var camera4 = new BABYLON.ArcRotateCamera("camera4",  4 * Math.PI / 2, 7 * Math.PI / 16, 25, new BABYLON.Vector3(0, 0, 0), scene);
    
    // Attach controls to cameras
    camera1.attachControl(canvas, true);
	camera2.attachControl(canvas, true);
	camera3.attachControl(canvas, true);
	camera4.attachControl(canvas, true);
    
    // Set four separate viewports
    camera1.viewport = new BABYLON.Viewport(0, 0, 0.5, 0.5);
    camera2.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);
    camera3.viewport = new BABYLON.Viewport(0, 0.5, 0.5, 0.5);
    camera4.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 0.5);

    // Add cameras to scene
    scene.activeCameras.push(camera1);
    scene.activeCameras.push(camera2);
    scene.activeCameras.push(camera3);
    scene.activeCameras.push(camera4);

    // Add lights to scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(500, 500, 500), scene);
    light1.intensity = .3;
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-500, 500, -500), scene);
    light2.intensity = .7;

    // Define background layer to scene
    var layer = new BABYLON.Layer('','https://i.imgur.com/mBBxGJH.jpg', scene, true);

    //  Add objects to scene
    if (showBox) drawBox(scene);

    if (showAxis) drawAxis(scene);

    return scene;
};


function drawBox(scene){
    box1 = BABYLON.MeshBuilder.CreateBox("box", { width: 20.25, depth:.25 }, scene);
    box1.position = new BABYLON.Vector3(0, 0, 10);

    box2 = BABYLON.MeshBuilder.CreateBox("box", { width: 20.25, depth:.25 }, scene);
    box2.position = new BABYLON.Vector3(0, 0, -10);

    box3 = BABYLON.MeshBuilder.CreateBox("box", { width: .25, depth: 20 }, scene);
    box3.position = new BABYLON.Vector3(10, 0, 0);

    box4 = BABYLON.MeshBuilder.CreateBox("box", { width: .25, depth: 20 }, scene);
    box4.position = new BABYLON.Vector3(-10, 0, 0);

    ground = BABYLON.Mesh.CreateGround('ground1', 20, 20, 0, scene, true);
    ground.position = new BABYLON.Vector3(0, -.001, 0);
    // ground.material = new BABYLON.StandardMaterial("gmat", scene);
}

function drawAxis(scene) {

	var showAxis = function(size) {
		var makeTextPlane = function(text, color, size) {
		var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
		dynamicTexture.hasAlpha = true;
		dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
		var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
		plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
		plane.material.backFaceCulling = false;
		plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
		plane.material.diffuseTexture = dynamicTexture;
		return plane;
    };
  
	var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
		new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
		new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
		], scene);
	axisX.color = new BABYLON.Color3(1, 0, 0);
	var xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, 0.05 * size, 0);
    
    var axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    var yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    
    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
        ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    var zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	};
  
    showAxis(6);
}