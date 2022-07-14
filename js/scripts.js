const featureSelector = document.getElementById('feature-selector');
const output = document.getElementById('output');

// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwa-devices/service-worker.js', { scope: '/pwa-devices/' })
    .catch(function (error) {
      console.log('Service Worker failed to register:', error);
    });
}
else {
  console.log('Service Worker is not supported by this browser.');
}

/**
 * Handles the feature selector.
 * Validates the selected option and calls the proper function.
 */
featureSelector.addEventListener('change', (event) => {
  output.innerText = '';

  const selectedOption = event.target.value;
  switch (selectedOption) {
    case 'battery':
      handleBatteryStatusAPI();
      break;

    case 'network-info':
      handleNetworkInformation();
      break;

    case 'fullscreen':
      handleFullscreenAPI();
      break;

    case 'screen-orientation':
      handleScreenOrientationAPI();
      break;

    case 'vibration':
      handleVibrationAPI();
      break;

    case 'badging':
      handleBadgingAPI();
      break;

    case 'page-visibility':
      handlePageVisibility();
      break;

    case 'idle-detection':
      handleIdleDetectionAPI();
      break;

    case 'screen-wake-lock':
      handleScreenWakeLockAPI();
      break;

    case 'permissions':
      handlePermissionsAPI();
      break;

    case 'geolocation':
      handleGeolocationAPI();
      break;

    case 'aaaa':
      aaaa();
      break;

    case 'aaaa':
      aaaa();
      break;

    case 'aaaa':
      aaaa();
      break;

  }
});

/**
 * The Battery Status API provides information about the system's
 * battery charge level.
 * https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
 */
function handleBatteryStatusAPI() {
  console.log('navigator:', navigator);
  if ('getBattery' in navigator) {

    // Returns a Promise that resolves with a BatteryManager object.
    // https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
    navigator.getBattery()
      .then(battery => {
        console.log('Battery:', battery);

        // Helper function to write the battery info
        function writeBatteryInfo() {

          const batteryCharging = battery.charging ? 'Yes' : 'No';
          const batteryLevel = (battery.level * 100).toFixed(0) + '%';
          const chargingTime = battery.chargingTime + ' seconds';
          const dischargingTime = battery.dischargingTime + ' seconds';

          output.innerHTML = `
            <div>Bettery charging: <strong>${batteryCharging}</strong></div>
            <div>Bettery level: <strong>${batteryLevel}</strong></div>
            <div>Charging time: <strong>${chargingTime}</strong></div>
            <div>Discharging time: <strong>${dischargingTime}</strong></div>
          `;
        }
        writeBatteryInfo(); // Write the initial state

        // Fired when the battery charging state (the charging property) is updated.
        battery.addEventListener('chargingchange', () => {
          console.log("Battery charging:", battery.charging);
          writeBatteryInfo();
        });

        // Fired when the battery level (the level property) is updated.
        battery.addEventListener('levelchange', () => {
          console.log("Battery level:", battery.level);
          writeBatteryInfo();
        });

        // Fired when the battery charging time (the chargingTime property) is updated.
        battery.addEventListener('chargingtimechange', () => {
          console.log("Charging time:", battery.chargingTime);
          writeBatteryInfo();
        });

        // Fired when the battery discharging time (the dischargingTime property) is updated.
        battery.addEventListener('dischargingtimechange', () => {
          console.log("Discharging time:", battery.dischargingTime);
          writeBatteryInfo();
        });

      });
  }
  else {
    output.innerText = 'Battery API not supported on this device.';
  }
}

/**
 * The Navigator.connection property returns an object containing information 
 * about the system's connection.
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection
 */
function handleNetworkInformation() {
  console.log('navigator:', navigator);
  if ('connection' in navigator) {
    console.log('Connection:', navigator.connection);

    // Helper function to write the network information
    function writeNetworkInfo() {
      const { type, effectiveType, downlink, downlinkMax } = navigator.connection;

      const networkType = type || 'unknown';
      const networkEffectiveType = effectiveType || 'unknown';
      const networkDownlink = downlink || 'unknown';
      const networkDownlinkMax = downlinkMax || 'unknown';

      output.innerHTML = `
        <div>Current network type: <strong>${networkType}</strong></div>
        <div>Cellular connection type: <strong>${networkEffectiveType}</strong></div>
        <div>Estimated bandwidth: <strong>${networkDownlink}</strong> Mbps</div>
        <div>Maximum downlink: <strong>${networkDownlinkMax}</strong> Mbps</div>
      `;
    }
    writeNetworkInfo(); // Write the initial state

    // The event that's fired when connection information changes.
    navigator.connection.addEventListener('change', () => {
      console.log('Connection changed:', navigator.connection);
      writeNetworkInfo();
    });
  }
  else {
    output.innerText = 'Network information not available on this device.';
  }
}

/**
 * The Fullscreen API adds methods to present a specific Element
 * (and its descendants) in fullscreen mode, and to exit fullscreen
 * mode once it is no longer needed.
 * https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
 */
function handleFullscreenAPI() {
  console.log('Document:', document);
  if ('fullscreenElement' in document && 'exitFullscreen' in document && document.fullscreenEnabled) {

    // Create a button element for actions
    const button = document.createElement('button');
    button.innerText = 'Toggle Fullscreen';
    output.appendChild(button);

    // Create a div element for displaying messages
    const message = document.createElement('div');
    message.innerText = 'Click on the button above';
    output.appendChild(message);

    // Adds an action to the toggle button
    button.addEventListener('click', () => {
      if (!document.fullscreenElement) {

        /**
         * Asks the user agent to place the specified element
         * (and, by extension, its descendants) into fullscreen
         * mode, removing all of the browser's UI elements
         * as well as all other applications from the screen.
         * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
         */
        document.documentElement.requestFullscreen()
          .then(() => {
            message.innerText = 'You are on fullscreen mode now.'
          });
      }
      else {

        /**
         * Requests that the user agent switch from
         * fullscreen mode back to windowed mode.
         * https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
         */
        document.exitFullscreen()
          .then(() => {
            message.innerText = 'You left the fullscreen mode.'
          });
      }
    });
  }
  else {
    output.innerText = 'Fullscreen not available or enabled on this device.';
  }
}

/**
 * The Screen Orientation API provides information about the 
 * orientation of the screen, and allows locking the device on 
 * a specific orientation.
 * https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation
 */
function handleScreenOrientationAPI() {
  console.log('Screen:', screen);
  if ('orientation' in screen) {
    console.log('Screen Orientation:', screen.orientation);

    // Include the fullscreen mode functionality 
    handleFullscreenAPI();

    // Create button elements for actions
    const buttonLockPortrait = document.createElement('button');
    buttonLockPortrait.innerText = 'Lock Portrait';
    output.appendChild(buttonLockPortrait);

    const buttonLockLandscape = document.createElement('button');
    buttonLockLandscape.innerText = 'Lock Landscape';
    output.appendChild(buttonLockLandscape);

    const buttonUnlock = document.createElement('button');
    buttonUnlock.innerText = 'Unlock';
    output.appendChild(buttonUnlock);

    // Create a div element for displaying messages
    const message = document.createElement('div');
    message.innerText = '';
    output.appendChild(message);

    // Create a helper function for lockig the screen
    const lockOrientation = (orientation) => {

      /**
       * Locks the orientation of the containing document
       * to the specified orientation.
       * https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
       */
      screen.orientation.lock(orientation)
        .then(() => {
          message.innerText = `Locked to ${screen.orientation.type}`;
        })
        .catch(error => {
          message.innerText = `Lock error: ${error}`;
        });
    };

    buttonLockPortrait.addEventListener('click', () => {
      lockOrientation('portrait');
    });

    buttonLockLandscape.addEventListener('click', () => {
      lockOrientation('landscape');
    });

    buttonUnlock.addEventListener('click', () => {

      /**
       * Unlocks the orientation of the containing document
       * from its default orientation.
       * https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/unlock
       */
      screen.orientation.unlock();
      message.innerHTML = 'Orientation unlocked';
    });

  }
  else {
    output.innerText = 'Screen orientation is not available on this device.';
  }
}

/**
 * The Navigator.vibrate method pulses the vibration 
 * hardware on the device. Vibration is described as
 * a pattern of on-off pulses.
 * https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API 
 */
function handleVibrationAPI() {
  console.log('Navigator:', navigator);
  if ('vibrate' in navigator) {

    // Single vibration
    const buttonSingle = document.createElement('button');
    output.appendChild(buttonSingle);
    buttonSingle.innerText = 'Single Vibration';
    buttonSingle.addEventListener('click', () => {

      /**
       * Pulses the vibration hardware on the device.
       * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
       */
      navigator.vibrate(200); // Vibrate for 200ms
    });

    // Multiple vibration
    const buttonMultiple = document.createElement('button');
    output.appendChild(buttonMultiple);
    buttonMultiple.innerText = 'Multiple Vibration';
    buttonMultiple.addEventListener('click', () => {

      /**
       * Pulses the vibration hardware on the device.
       * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
       */
      navigator.vibrate([200, 100, 200, 300, 600]); // A sequence of vibrations and pauses.
    });
  }
  else {
    output.innerText = 'Vibration is not supported on this device.';
  }
}

/**
 * Sets a badge on a document or application, to act as a 
 * notification that state has changed without displaying 
 * a more distracting notification.
 * https://developer.mozilla.org/en-US/docs/Web/API/Badging_API
 */
function handleBadgingAPI() {
  console.log('Navigator:', navigator);
  if ('setAppBadge' in navigator || 'setClientBadge' in navigator) {

    // Create the helper elements
    const buttonSetAppBadge = document.createElement('button');
    output.appendChild(buttonSetAppBadge);
    buttonSetAppBadge.innerText = 'Set App Badge';

    const buttonClearAppBadge = document.createElement('button');
    output.appendChild(buttonClearAppBadge);
    buttonClearAppBadge.innerText = 'Clear App Badge';

    const message = document.createElement('div');
    message.innerText = '';
    output.appendChild(message);

    // Set App Badge
    buttonSetAppBadge.addEventListener('click', () => {

      /**
       * Sets a badge on the icon associated with this app.
       * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/setAppBadge
       * 
       */
      navigator.setAppBadge(12)
        .then(() => {
          message.innerText = 'Badge set to the app.';
        });
    });

    // Clear App Badge
    buttonClearAppBadge.addEventListener('click', () => {

      /**
       * Clears the badge on the icon associated with this app.
       * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clearAppBadge
       */
      navigator.clearAppBadge()
        .then(() => {
          message.innerText = 'Badge cleared from the app.';
        });
    });

  }
  else {
    output.innerText = 'Badge API not available on this device.';
  }
}

/**
 * The visibilitychange event is fired at the document when the
 * contents of its tab have become visible or have been hidden.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event 
 */
function handlePageVisibility() {
  let leftTime;

  output.innerHTML = `
    Page visibility set.<br>
    Please, don't leave me!
  `;

  /**
   * Returns the visibility of the document
   */
  console.log('State:', document.visibilityState);

  /**
   * Event fired at the document when the contents of its tab
   * have become visible or have been hidden.
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
   */
  document.addEventListener("visibilitychange", function () {
    console.log('State:', document.visibilityState);

    if (document.visibilityState === 'hidden') {

      // Register when the user left
      leftTime = new Date();

      // Display a notification
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          navigator.serviceWorker.ready
            .then((registration) => {
              registration.showNotification('Come back, please!!!', {
                body: 'Don\'t leave me here alone.',
                icon: '/pwa-devices/images/logo.png'
              });
            });
        }
      });
    }
    else {
      const now = new Date();
      const timeAway = (now.getTime() - leftTime.getTime()) / 1000;
      output.innerHTML = `
        Welcome back!!!<br>
        You were away for ${timeAway.toFixed(0)} seconds.
      `;
    }
  });
}

/**
 * Provides a means to detect the user's idle status, active, 
 * idle, and locked, specifically, and to be notified of changes 
 * to idle status.
 * https://developer.mozilla.org/en-US/docs/Web/API/Idle_Detection_API
 */
function handleIdleDetectionAPI() {

  if ('IdleDetector' in window) {
    console.log('IdleDetector:', IdleDetector);

    // Create the helper elements
    const buttonPermission = document.createElement('button');
    output.appendChild(buttonPermission);
    buttonPermission.innerText = 'Request Permission';

    const buttonDetection = document.createElement('button');
    output.appendChild(buttonDetection);
    buttonDetection.innerText = 'Start Listening';

    const message = document.createElement('div');
    message.innerText = '';
    output.appendChild(message);

    const buttonClock = document.createElement('button');
    output.appendChild(buttonClock);
    buttonClock.innerText = 'Clock';

    // Requests for permission
    buttonPermission.addEventListener('click', () => {

      /**
       * Returns a Promise that resolves with a string when 
       * the user has chosen whether to grant the origin access 
       * to their idle state.
       * https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector/requestPermission 
       */
      IdleDetector.requestPermission()
        .then((permission) => {
          message.innerText = 'Permission: ' + permission;
        });
    });

    // Starts the detection
    buttonDetection.addEventListener('click', () => {

      // Creates a new IdleDetector object.
      const idleDetector = new IdleDetector();
      console.log('idleDetector', idleDetector);

      /**
       * Called when the value of userState or screenState has changed.
       * https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector#events
       */
      idleDetector.addEventListener('change', () => {
        console.log('Idle changed:', idleDetector);

        /**
         * Returns a string indicating whether the users has interacted
         * with either the screen or the device since the call to start().
         * https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector/userState
         */
        const userState = idleDetector.userState;

        /**
         * Returns a string indicating whether the screen is locked.
         * https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector/screenState
         */
        const screenState = idleDetector.screenState;

        message.innerHTML += `
          <div>Idle change: user <b>${userState}</b>, screen <b>${screenState}</b>.</div>
        `;
      });

      /**
       * Returns a Promise that resolves when the detector starts
       * listening for changes in the user's idle state.
       * This method takes an optional 'options' object with 
       * the 'threshold' in milliseconds where inactivity should
       * be reported (minimum of 1 minute).
       * https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector/start
       */
      idleDetector.start({
        threshold: 60000
      })
        .then(() => {
          console.log('Idle detection started.');
          buttonDetection.disabled = true;
        });
    });

    // Helper button to count elapsed seconds.
    // It has no relation to the IdleDetector object.
    buttonClock.addEventListener('click', () => {
      let seconds = 0;
      buttonClock.innerText = 'Counting';

      setInterval(() => {
        seconds++;
        buttonClock.innerText = seconds + ' seconds';
      }, 1000);
    });

  }
  else {
    output.innerText = 'IdleDetector not supported on this device.';
  }
}

/**
 * The Screen Wake Lock API provides a way to prevent devices from dimming
 * or locking the screen when an application needs to keep running.
 * https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
 */
function handleScreenWakeLockAPI() {
  console.log('Navigator:', navigator);
  if ('wakeLock' in navigator) {
    console.log('Navigator wakeLock:', navigator.wakeLock);

    /**
     * The request() method returns a Promise that resolves with a
     * WakeLockSentinel object, which allows control over screen
     * dimming and locking.
     * https://developer.mozilla.org/en-US/docs/Web/API/WakeLock/request
     */
    navigator.wakeLock.request('screen')
      .then((sentinel) => {
        console.log('WakeLockSentinel:', sentinel);

        output.innerHTML = `
          <div>Wake Lock is active!</div>
        `;

        // Create a button to release the lock.
        const button = document.createElement('button');
        button.innerText = 'Release screen';
        output.append(button);

        button.addEventListener('click', () => {

          /**
           * Releases the WakeLockSentinel.
           * https://developer.mozilla.org/en-US/docs/Web/API/WakeLockSentinel/release
           */
          sentinel.release()
            .then(() => {
              sentinel = null;
              output.innerHTML = `
                Wake Lock deactivated.<br>
                The screen was released!
              `;
            });
        });

      });
  }
  else {
    output.innerText = 'Screen Wake Lock API not supported on this device.';
  }
}

/**
 * Provides a consistent way to query the status of API
 * permissions attributed to the current context.
 * https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API 
 */
function handlePermissionsAPI() {
  console.log('Navigator:', navigator);
  if ('permissions' in navigator) {
    console.log('Permissions:', navigator.permissions);

    // Create the helper elements
    const select = document.createElement('select');
    output.appendChild(select);
    console.log(select);

    let option = document.createElement("option");
    option.value = '';
    option.text = '- Select -';
    select.appendChild(option);

    const values = ["geolocation", "notifications", "push", "midi", "camera", "microphone", "background-fetch", "background-sync", "persistent-storage", "ambient-light-sensor", "accelerometer", "gyroscope", "magnetometer", "screen-wake-lock", "nfc", "display-capture", "accessibility-events", "clipboard-read", "clipboard-write", "payment-handler", "idle-detection", "periodic-background-sync", "system-wake-lock", "storage-access", "window-placement", "local-fonts"];
    for (const val of values) {
      const option = document.createElement("option");
      option.value = val;
      option.text = val;
      select.appendChild(option);
    }

    const message = document.createElement('div');
    message.innerText = 'Select a permission above.';
    output.appendChild(message);

    // Query permissions
    select.addEventListener('change', () => {
      const selectedOption = select.value;

      /**
       * Returns the state of a user permission.
       * https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
       */
      navigator.permissions.query({
        name: selectedOption,
        userVisibleOnly: true // Only necessary for the Push API
      })
        .then(function (permissionStatus) {
          console.log('Status:', permissionStatus);

          message.innerHTML = `
            State for <b>${permissionStatus.name || selectedOption}</b>: ${permissionStatus.state}
          `;

          if (permissionStatus.state === 'granted') {
            // The app is allowed to use the API
          }

          /**
           * Fires whenever the PermissionStatus.state property changes.
           * https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
           */
          permissionStatus.addEventListener('change', function () {
            message.innerHTML += `
              <div>Changed state for <b>${this.name || selectedOption}</b>: ${this.state}</div>
            `;
          })
        });
    });

  }
  else {
    output.innerText = 'Permission API not available on this device.';
  }
}

/**
 * Allows the user to provide their location to web
 * applications if they so desire.
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
function handleGeolocationAPI() {
  console.log('Navigator:', navigator);
  if ('geolocation' in navigator) {
    console.log('Geolocation:', navigator.geolocation);

    // Create the helper elements
    const buttonCurrentPosition = document.createElement('button');
    output.appendChild(buttonCurrentPosition);
    buttonCurrentPosition.innerText = 'Current Position';

    const buttonWatchPosition = document.createElement('button');
    output.appendChild(buttonWatchPosition);
    buttonWatchPosition.innerText = 'Watch Position';

    const message = document.createElement('div');
    message.innerText = '';
    output.appendChild(message);

    // Callback functions
    const onLocationSuccess = (position) => {
      console.log('Position:', position);

      message.outerHTML = `
        <br>Latitude: ${position.coords.latitude}
        <br>Longitude: ${position.coords.longitude}
        <br>More or less ${position.coords.accuracy} meters.
      `;
    }

    const onLocationError = (error) => {
      console.log('Error:', error);
      message.innerText = 'Geolocation failed.';
    }

    // Get current position
    buttonCurrentPosition.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
    });

    // Watch position change
    buttonWatchPosition.addEventListener('click', () => {
      navigator.geolocation.watchPosition(onLocationSuccess, onLocationError);
    });

  }
  else {
    output.innerText = 'Geolocation API not available on this device.';
  }
}





function aaa() {
  if ('aaa' in aaa) {
    console.log('aaa:', aaa.aaa);


  }
  else {
    output.innerText = 'aaa not available on this device.';
  }
}











// let acl = new Accelerometer();
// acl.addEventListener('reading', () => {
//   // console.log("Acceleration along the X-axis " + acl.x);
//   // console.log("Acceleration along the Y-axis " + acl.y);
//   // console.log("Acceleration along the Z-axis " + acl.z);

//   output.innerHTML = `
//     <br>X-axis: ${acl.x}
//     <br>Y-axis: ${acl.y}
//     <br>Z-axis: ${acl.z}
//   `;

// });

// acl.start();





// let laSensor = new LinearAccelerationSensor({ frequency: 60 });

// laSensor.addEventListener('reading', e => {
//   console.log("Linear acceleration along the X-axis " + laSensor.x);
//   console.log("Linear acceleration along the Y-axis " + laSensor.y);
//   console.log("Linear acceleration along the Z-axis " + laSensor.z);
// });
// laSensor.start();




// let gyroscope = new Gyroscope({ frequency: 60 });

// gyroscope.addEventListener('reading', e => {
//   console.log("Angular velocity along the X-axis " + gyroscope.x);
//   console.log("Angular velocity along the Y-axis " + gyroscope.y);
//   console.log("Angular velocity along the Z-axis " + gyroscope.z);

//   output.innerHTML = `
//     <br>X-axis: ${gyroscope.x}
//     <br>Y-axis: ${gyroscope.y}
//     <br>Z-axis: ${gyroscope.z}
//   `;
// });
// gyroscope.start();




// let gravitySensor = new GravitySensor({ frequency: 60 });

// gravitySensor.addEventListener("reading", e => {
//   // console.log(`Gravity along the X-axis ${gravitySensor.x}`);
//   // console.log(`Gravity along the Y-axis ${gravitySensor.y}`);
//   // console.log(`Gravity along the Z-axis ${gravitySensor.z}`);

//   output.innerHTML = `
//     <br>X-axis: ${gravitySensor.x}
//     <br>Y-axis: ${gravitySensor.y}
//     <br>Z-axis: ${gravitySensor.z}
//   `;

// });

// gravitySensor.start();




// let magSensor = new Magnetometer({ frequency: 60 });
// console.log('magSensor', magSensor);

// magSensor.addEventListener('reading', e => {
//   // console.log("Magnetic field along the X-axis " + magSensor.x);
//   // console.log("Magnetic field along the Y-axis " + magSensor.y);
//   // console.log("Magnetic field along the Z-axis " + magSensor.z);

//   output.innerHTML = `
//     <br>X-axis: ${magSensor.x}
//     <br>Y-axis: ${magSensor.y}
//     <br>Z-axis: ${magSensor.z}
//   `;
// });
// magSensor.start();


// if ('AmbientLightSensor' in window) {
//   const sensor = new AmbientLightSensor();
//   sensor.addEventListener('reading', event => {
//     console.log('Current light level:', sensor.illuminance);
//   });
//   sensor.addEventListener('error', event => {
//     console.log(event.error.name, event.error.message);
//   });
//   sensor.start();
// }
// else {
//   console.log('nope');
// }




// const options = { frequency: 60, referenceFrame: 'device' };
// const sensor = new AbsoluteOrientationSensor(options);

// sensor.addEventListener('reading', () => {
//   // model is a Three.js object instantiated elsewhere.
//   //model.quaternion.fromArray(sensor.quaternion).inverse();
//   console.log(sensor.quaternion);
// });
// sensor.addEventListener('error', error => {
//   if (event.error.name == 'NotReadableError') {
//     console.log("Sensor is not available.");
//   }
// });
// sensor.start();



// const options = { frequency: 60, referenceFrame: 'device' };
// const sensor = new RelativeOrientationSensor(options);

// sensor.addEventListener('reading', () => {
//   // model is a Three.js object instantiated elsewhere.
//   //model.quaternion.fromArray(sensor.quaternion).inverse();
//   console.log(sensor.quaternion);
// });
// sensor.addEventListener('error', error => {
//   if (event.error.name == 'NotReadableError') {
//     console.log("Sensor is not available.");
//   }
// });
// sensor.start();










// const panel = document.getElementById('panel');
// const output2 = document.getElementById('output2');
// const output3 = document.getElementById('output3');
// // panel.addEventListener('click', () => {
// //   output.innerHTML = 'Clicked';
// // });
// panel.addEventListener('touchstart', (e) => {
//   output.innerHTML = `
//   touchstart: x: ${e.touches[0].pageX.toFixed(0)}, y: ${e.touches[0].pageY.toFixed(0)}
//   `;
// });
// panel.addEventListener('touchmove', (e) => {
//   // console.log(e);
//   output.innerHTML = `
//   touchmove: x: ${e.touches[0].pageX.toFixed(0)}, y: ${e.touches[0].pageY.toFixed(0)}
//   `;
// });
// panel.addEventListener('touchend', (e) => {
//   console.log(e);
//   output.innerHTML = `
//   touchend
//   `;
// });
// panel.addEventListener('pointerdown', (e) => {
//   output2.innerHTML = `
//   pointerdown: x: ${e.offsetX.toFixed(0)}, y: ${e.offsetY.toFixed(0)}<br>
//   pointerdown: x: ${e.pageX.toFixed(0)}, y: ${e.pageY.toFixed(0)}
//   `;
// });
// panel.addEventListener('pointermove', (e) => {
//   output2.innerHTML = `
//   pointermove: x: ${e.offsetX.toFixed(0)}, y: ${e.offsetY.toFixed(0)}<br>
//   pointermove: x: ${e.pageX.toFixed(0)}, y: ${e.pageY.toFixed(0)}
//   `;
// });
// panel.addEventListener('pointerup', (e) => {
//   output2.innerHTML = `
//   pointerup: x: ${e.offsetX.toFixed(0)}, y: ${e.offsetY.toFixed(0)}<br>
//   pointerup: x: ${e.pageX.toFixed(0)}, y: ${e.pageY.toFixed(0)}
//   `;
// });
// panel.addEventListener('mousedown', () => {
//   output3.innerHTML = 'mousedown';
// });
// panel.addEventListener('mousemove', (e) => {
//   output3.innerHTML = `
//   mousemove: x: ${e.offsetX.toFixed(0)}, y: ${e.offsetY.toFixed(0)}<br>
//   mousemove: x: ${e.pageX.toFixed(0)}, y: ${e.pageY.toFixed(0)}
//   `;
// });
// panel.addEventListener('mouseup', () => {
//   output3.innerHTML = 'mouseup';
// });










