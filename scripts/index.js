(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function() {
        console.log('Service Worker Registered');
      });
  }

  let deferredPrompt;
  const addBtn = document.querySelector('#add-button');
  addBtn.style.display = 'none';
  //
  // window.addEventListener('beforeinstallprompt', (e) => {
  //   // Prevent the mini-infobar from appearing on mobile
  //   e.preventDefault();
  //   // Stash the event so it can be triggered later.
  //   deferredPrompt = e;
  //
  //   if (window.matchMedia('(display-mode: standalone)').matches) {
  //     console.log('display-mode is standalone');
  //   } else {
  //
  //     if (deferredPrompt) {
  //       deferredPrompt.prompt();
  //       // Wait for the user to respond to the prompt
  //       deferredPrompt.userChoice.then((choiceResult) => {
  //         if (choiceResult.outcome === 'accepted') {
  //           console.log('User accepted the install prompt');
  //         } else {
  //           console.log('User dismissed the install prompt');
  //         }
  //       });
  //     }
  //     addBtn.style.display = 'block';
  //   }
  // });
  //
  // addBtn.addEventListener('click', (e) => {
  //   // Show the install prompt
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     // Wait for the user to respond to the prompt
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the install prompt');
  //       } else {
  //         console.log('User dismissed the install prompt');
  //       }
  //     });
  //   }
  // });
  //
  // window.addEventListener('appinstalled', (evt) => {
  //   console.log('INSTALL: Success');
  //   addBtn.style.display = 'none';
  // });
  //
  // window.addEventListener('DOMContentLoaded', () => {
  //   let displayMode = 'browser tab';
  //   if (navigator.standalone) {
  //     displayMode = 'standalone-ios';
  //   }
  //   if (window.matchMedia('(display-mode: standalone)').matches) {
  //     displayMode = 'standalone';
  //   }
  //   // Log launch display mode to analytics
  //   console.log('DISPLAY_MODE_LAUNCH:', displayMode);
  // });
  //

  // var deferredPrompt;
  window.addEventListener('beforeinstallprompt', function(e) {
    console.log("beforeinstallprompt");
     // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    showAddToHomeScreen();
  });

  function showAddToHomeScreen() {
    console.log("showAddToHomeScreen");
    addBtn.style.display = "block";
    addBtn.addEventListener("click", addToHomeScreen);
  }

  function addToHomeScreen() {
    console.log("addToHomeScreen");
    deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choiceResult){
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
})();
