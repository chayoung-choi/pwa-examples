(function() {
  'use strict';

  if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

  let deferredPrompt;
  const addBtn = document.querySelector('#add-button');
  addBtn.style.display = 'none';

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log("beforeinstallprompt", e);
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    addBtn.style.display = 'block';
  });

  addBtn.addEventListener('click', (e) => {
    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    }
  });

  window.addEventListener('appinstalled', (evt) => {
    // Log install to analytics
    console.log('INSTALL: Success');
    addBtn.style.display = 'none';
  });

  window.addEventListener('DOMContentLoaded', () => {
    let displayMode = 'browser tab';
    if (navigator.standalone) {
      displayMode = 'standalone-ios';
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      displayMode = 'standalone';
    }
    // Log launch display mode to analytics
    console.log('DISPLAY_MODE_LAUNCH:', displayMode);
  });
//   // addBtn.style.display = 'none';
//
//   window.addEventListener('beforeinstallprompt', function (event) {
//     console.log('beforeinstallprompt');
//     event.preventDefault();
//
//     window.promptEvent = event;
//     if (window.matchMedia('(display-mode: standalone)').matches) {
//       console.log('display-mode is standalone');
//     } else {
//       console.log('show button');
//       addBtn.style.display = 'block';
//     }
//   });
//   // window.addEventListener('beforeinstallprompt', (e) => {
//   //   console.log('beforeinstallprompt');
//   //   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   //   e.preventDefault();
//   //   // Stash the event so it can be triggered later.
//   //   deferredPrompt = e;
//   //   // Update UI to notify the user they can add to home screen
//   //   if (window.matchMedia('(display-mode: standalone)').matches) {
//   //     console.log('display-mode is standalone');
//   //   } else {
//   //     console.log('show button');
//   //     addBtn.style.display = 'block';
//   //   }
//   //   // addBtn.addEventListener('click', (e) => {
//   //   //   // hide our user interface that shows our A2HS button
//   //   //   addBtn.style.display = 'none';
//   //   //   // Show the prompt
//   //   //   deferredPrompt.prompt();
//   //   //   // Wait for the user to respond to the prompt
//   //   //   deferredPrompt.userChoice.then((choiceResult) => {
//   //   //       if (choiceResult.outcome === 'accepted') {
//   //   //         console.log('User accepted the prompt');
//   //   //       } else {
//   //   //         console.log('User dismissed the prompt');
//   //   //       }
//   //   //       deferredPrompt = null;
//   //   //     });
//   //   // });
//   // });
//
//   function addToHomeScreen() {
//     addBtn.style.display = 'none';
//     window.promptEvent.prompt();
//     window.promptEvent.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the prompt')
//       } else {
//         console.log('User dismissed the prompt')
//       }
//     })
//   }
//
})();
