(() => {

  function defaultListener(event) {
    event.target.classList.toggle('settings-toggle--toggled');
  }

  function initialiseToggle(element, bespokeListener) {
    element.addEventListener('click', defaultListener);
    element.addEventListener('click', bespokeListener);
  }

  initialiseToggle(themeToggle, () => {
    document.documentElement.classList.toggle('dark');
  });

  initialiseToggle(compactToggle, () => {
    Array.prototype.forEach.call(
      document.getElementsByClassName('evidence-list'), (list) => {
        list.classList.toggle('evidence-list--compact');
      }
    );
  });

})();
