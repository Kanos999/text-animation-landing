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

      const landingTextHTML = "<b class='landingText'>HELLO</b>";
      if (i === Math.floor(height / 4)) {
        row = row.slice(0, Math.floor(width/2 - 3)) + "<b class='landingText'>HELLO</b>" + row.slice(Math.floor(width/2 + 2), width-1);
      } else if (i === Math.floor(height / 2)) {
        row = row.slice(0, Math.floor(width/4 - 5)) + "<b class='landingText'>>_ABOUT_ME</b>" 
                 + row.slice(Math.floor(width/4 + 5), Math.floor(width/2 - 5)) + "<b class='landingText'>>_PROJECTS</b>" 
                 + row.slice(Math.floor(width/2 + 5), Math.floor(width*3/4 - 5)) + "<b class='landingText'>>_CONTACT</b>" + row.slice(Math.floor(width*3/4 + 4), width-1);
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
