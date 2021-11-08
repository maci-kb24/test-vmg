// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    'numSegments'  : 4,     // Specify number of segments.
    'responsive'   : true,  // This wheel is responsive!
    'outerRadius'  : 132,   // Set outer radius so wheel fits inside the background.
    'centerX'      : 217,   // Used to position the background properly
    'centerY'      : 219,
    'textFontSize' : 16,    // Set font size as desired.
    'textAlignment'  : 'center',
    'textMargin'     : 10,
    'segments'     :        // Define segments including colour and text.
    [
       {'fillStyle' : '#eae56f', 'text' : '$1000'},
       {'fillStyle' : '#89f26e', 'text' : '$500'},
       {'fillStyle' : '#7de6ef', 'text' : '10 Free Spins'},
       {'fillStyle' : '#e7706f', 'text' : 'Spin Again'},
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 5,     // Duration in seconds.
        'spins'    : 8,     // Number of complete spins.
        'callbackFinished' : alertPrize
    }
});



// Vars used by the code in this page to do power controls.
let wheelPower    = 0;
let wheelSpinning = false;


// Light up the spin button by changing it's source image and adding a clickable class to it.
document.getElementById('spin_button').src = "/Images/wheel/spin_on.png";
document.getElementById('spin_button').className = "clickable";

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 8;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 15;
        }
        

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').src       = "/Images/wheel/spin_off.png";
        document.getElementById('spin_button').className = "";

        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment)
{
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    swal(`Congratulations! You have won ${indicatedSegment.text}! Claim now!`);
}


