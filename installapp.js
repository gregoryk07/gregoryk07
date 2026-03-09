var installApp = {
  deferredPrompt: null
};


installApp.deferredPrompt = null;

// 1. Listen for the browser's "installable" signal
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default mini-infobar from appearing
  e.preventDefault();
  // Stash the event so it can be triggered later
  installApp.deferredPrompt = e;
});

// 2. Trigger the prompt when the user clicks your button
installApp.install = async () => {
  if (installApp.deferredPrompt) {
    // Show the install prompt
    installApp.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await installApp.deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again
    installApp.deferredPrompt = null;
    // Hide your install button
  }
}