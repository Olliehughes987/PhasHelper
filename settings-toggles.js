(() => {

  function initialiseToggle(element, listener) {
    element.addEventListener('click', (event) => {
      event.target.classList.toggle('settings-toggle--toggled');
    });

    element.addEventListener('click', listener);
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
