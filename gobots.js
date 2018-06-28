var config = {
  apiKey: "AIzaSyBTbd3Shmheq6wUupO9jy5jleoq9YwbUOU",
  authDomain: "gobots-dragonbarbudo.firebaseapp.com",
  databaseURL: "https://gobots-dragonbarbudo.firebaseio.com",
  projectId: "gobots-dragonbarbudo",
  storageBucket: "",
  messagingSenderId: "537723790814"
};
firebase.initializeApp(config);



var world = new p2.World({
    gravity:[0, -9.82]
});

// Create an empty dynamic body
var circleBody = new p2.Body({
    mass: 5,
    position: [0, 10]
});

// Add a circle shape to the body
var circleShape = new p2.Circle({ radius: 1 });
circleBody.addShape(circleShape);

// ...and add the body to the world.
// If we don't add it to the world, it won't be simulated.
world.addBody(circleBody);

// Create an infinite ground plane body
var groundBody = new p2.Body({
    mass: 0 // Setting mass to 0 makes it static
});
var groundShape = new p2.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

var fixedTimeStep = 1 / 60; // seconds
var maxSubSteps = 10; // Max sub steps to catch up with the wall clock
var lastTime;

// Animation loop
function animate(time){
	requestAnimationFrame(animate);

    // Compute elapsed time since last render frame
    var deltaTime = lastTime ? (time - lastTime) / 1000 : 0;

    // Move bodies forward in time
    world.step(fixedTimeStep, deltaTime, maxSubSteps);

    // Render the circle at the current interpolated position
    renderCircleAtPosition(circleBody.interpolatedPosition);

    lastTime = time;
}

// Start the animation loop
requestAnimationFrame(animate);
