export const transitionEnter = function(e) {
  this.$nextTick(function() {
    e.style.height = `${e.firstChild.offsetHeight}px`;
  })
};

export const transitionLeave = function (e) {
  e.style.height = '0px';
};
