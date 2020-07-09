(function() {
  'use strict';

  if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

  let deferredPrompt;
  const addBtn = document.querySelector('#add-button');
  // addBtn.style.display = 'none';
  //
  // window.addEventListener('beforeinstallprompt', function (event) {
  //   event.preventDefault();
  //   window.promptEvent = event;
  //   addBtn.style.display = 'block';
  // });

  addBtn.addEventListener('click', (e) => {
    // Show the install prompt
    window.promptEvent.prompt();
    //@ts-ignore
    window.promptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
    });
  });

})();
