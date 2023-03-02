const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    showInstall();
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    hideInstall();
    deferredPrompt.prompt();

    const { response } = await deferredPrompt.userChoice;
    deferredPrompt = null;


});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (e) => {
    hideInstall();
    deferredPrompt = null;
    console.log('pwa installed');


    
});
