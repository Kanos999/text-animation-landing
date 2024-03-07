$(document).ready(function(){
  // Populate the background html dynamically
  let htmlString = "";
  let chars = "/abcde{}fghijklmnopq[]rstuvwxyz..............." //"@%#*+=-:.   ";
  let height = $("#main").height() / 24,
      width = $("#main").width() / 14,
      res = 50,
      frame = 0,
      fps = 10;


  for (let i = 0; i < height; i++) {
    htmlString += `<p id="bg-row-${i}" class="bg-row"></p>`;
  }

  $("#main").html(htmlString);

  noise.seed(Math.random());

  // Generate the 2d array of characters
  const interval = setInterval(() => {
    for (var i = 0; i < height; i++) {
      let row = [];
      for (var j = 0; j < width; j++) {
        // All noise functions return values in the range of -1 to 1.
        var value = noise.perlin3(i / res, j / res, frame / res);
        row[j] = chars.charAt(Math.abs(value) * chars.length); 
      }
      row = row.join('');

      // Manuall insert html tag for options
      const manualTexts = [
        {
          htmlTag: "<b class='landingText'>HI! I'M KANE</b>",
          textLength: 12
        },
        {
          htmlTag: "<a href='#about' class='landingText'>> ABOUT ME</a>",
          textLength: 10
        },
        {
          htmlTag: "<a href='#projects' class='landingText'>> PROJECTS</a>",
          textLength: 10
        },
        {
          htmlTag: "<a href='#contact' class='landingText'>> CONTACT</a>",
          textLength: 9
        },
      ]

      if (i === 5) {
        row = row.slice(0, Math.floor(width/2 - manualTexts[0].textLength/2)) 
            + manualTexts[0].htmlTag 
            + row.slice(Math.floor(width/2 + manualTexts[0].textLength/2), width-1);
      } else if (i === 10) {
        row = row.slice(0, Math.floor(width/2 - manualTexts[1].textLength/2)) 
            + manualTexts[1].htmlTag 
            + row.slice(Math.floor(width/2 + manualTexts[1].textLength/2), width-1);
      } else if (i === 12) {
        row = row.slice(0, Math.floor(width/2 - manualTexts[2].textLength/2)) 
            + manualTexts[2].htmlTag 
            + row.slice(Math.floor(width/2 + manualTexts[2].textLength/2), width-1);
      } else if (i === 14) {
        row = row.slice(0, Math.floor(width/2 - manualTexts[3].textLength/2)) 
            + manualTexts[3].htmlTag 
            + row.slice(Math.floor(width/2 + manualTexts[3].textLength/2), width-1);
      }

      $(`#bg-row-${i}`).html(row);
    }
    console.log(height);
    frame++;
  }, 1000 / fps)

  $( window ).on("resize", () => {
    height = $("#main").height() / 24;
    width = $("#main").width() / 14;
  });


});
