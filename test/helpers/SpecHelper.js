beforeEach(() => {
  jasmine.addMatchers({
    toBePlaying() {
      return {
        compare(actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});
