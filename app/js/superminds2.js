			// Full list of configuration options available here:
			// https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				controls: false,
				progress: true,
				history: true,
				center: true,
				

				theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
				transition: Reveal.getQueryHash().transition || 'linear', // default/cube/page/concave/zoom/linear/fade/none

				// Optional libraries used to extend on reveal.js
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
					//{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
					//{ src: '/socket.io/socket.io.js', async: true },
					//{ src: 'plugin/notes-server/client.js', async: true },
					//{ src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
				]
			});
			Reveal.addEventListener( 'slidestate', function() {
				console.log( '"customevent" has fired' );

			});
			Reveal.addEventListener( 'nosaucer', function() {
				$(".saucer2").addClass("saucer1").removeClass("saucer2");
				$("#saucertitle").html("infinite energy");

			});
			Reveal.addEventListener( 'crystal', function() {
				$(".crystal2").addClass("crystal1").removeClass("crystal2");
				$("#crystaltitle").html("crystal math");
			});
			Reveal.addEventListener( 'repackage', function() {
				$("#repackage").html("atomize");
				$(".repackage2").addClass("repackage1").removeClass("repackage2");
				// $("#repackage").html("repackage");
			});
			Reveal.addEventListener( 'tvinform', function() {
				$(".tvinform2").addClass("tvinform1").removeClass("tvinform2");
				$(".tvinform3").addClass("tvinform1").removeClass("tvinform3");
			});
			Reveal.addEventListener( 'atoms', function() {	
				$(".atom2").addClass("atom1").removeClass("atom2");
			});
			
			Reveal.addEventListener( 'prepics', function() {
				$("#picsframe").remove();
				$('#thousandpics').append('<iframe class="fill" id="picsframe" src="http://ec2-54-247-159-212.eu-west-1.compute.amazonaws.com/" style="max-height: 100%; width: 100%; height: 100%"></iframe>');
		        $('#thousandpics').css({
					left: ($(window).width() - $('#thousandpics').outerWidth())/2,
        			top: (0 - $('#thousandpics').outerHeight())/2
        		});
        		});

			Reveal.addEventListener( 'pics', function() {

        		});

			Reveal.addEventListener( 'postpics', function() {
				$("#picsframe").remove();
			});

			Reveal.addEventListener( 'message', function() {
				$("#filtertitle").html("the filter is the message");
			});

			Reveal.addEventListener( 'fragmentshown', function( event ) {
				console.log( event.fragment.id );
    			if(event.fragment.id == "saucerscale"){
    				$(".saucer1").addClass("saucer2").removeClass("saucer1");
    				$("#saucertitle").html("unlimited possibilities");
    			} else if(event.fragment.id == "crystaltweet"){
    				$(".crystal1").addClass("crystal2").removeClass("crystal1");
    				$("#crystaltitle").html("crystal ball");
    			} else if(event.fragment.id == "repackage2"){
    				$(".repackage1").addClass("repackage2").removeClass("repackage1");
					$("#repackage").html("repackage");	
    			} else if(event.fragment.id == "networks1"){
    				$("#d3title").html("irregular network");
    				numnodes = 50;
    				pathnodes = 4;
    				radius = 500;
    				nodes = [];
    				nodesX =[];
    				nodesY = [];

    				for (var i=0;i<numnodes;i++) { 
    					nodesX[i] = Math.random()*1920;
    					nodesY[i] = Math.random()*1080;
    				}

    				for (var i = 0; i < nodesX.length; i++) {
        				nodes.push({X: nodesX[i], Y: nodesY[i]});
    				}	

					//DRAW the NODES	
					var circle = svg.selectAll("circle")
					    .data(nodes);
					circle.enter().append("circle")
					    .attr("cy", function(d) {return d.Y;})
					    .attr("cx", function(coords,index) {return coords.X})
					    .attr("r", 12)
					    .attr("class","circle");
					circle.exit().remove();	

					//DRAW network1
					var lines = svg.selectAll(".network")
     					.data(nodes);
   					lines.enter().append("line")
    					.attr("x1", function(d) {return d.X;})
    					.attr("y1", function(d) {return d.Y;})
    					.attr("x2", function(d,i) {if (i+1 < numnodes) {return nodesX[i+1];} else {return nodesX[0]};})
    					.attr("y2", function(d,i) {if (i+1 < numnodes) {return nodesY[i+1];} else {return nodesY[0]};})
       					.attr("class","network");
       				lines.exit().remove();

       				//DRAW network2
       				nodes2 = [];
       				for (var i = 0; i < nodesX.length/2; i++) {
        				nodes2.push({X: nodesX[2*i], Y: nodesY[2*i]});
    				}	

       				var lines2 = svg.selectAll(".network2")
       					.data(nodes2);	
       					lines2.enter().append("line")
	    					.attr("x1", function(d) {return d.X;})
	    					.attr("y1", function(d) {return d.Y;})
	    					.attr("x2", function(d,i) {if (i+1 < nodes2.length) {return nodes2[i+1].X;} else {return nodes2[0].X};})
	    					.attr("y2", function(d,i) {if (i+1 < nodes2.length) {return nodes2[i+1].Y;} else {return nodes2[0].Y};})
	    					// .attr("y2", function(d,i) {if (i%2 == 0){if (i+1 < numnodes) {return nodesY[i+1];} else {return nodesY[0];};}})
	       					.attr("class","network2");
       				     
       				lines2.exit().remove();



       				
    				//fireD3(window.svg,1);
    			} else if(event.fragment.id == "networks2"){
    				$("#d3title").html("any connection");
    				nodes3 = [];
       				for (var i = 0; i < pathnodes; i++) {
       					currentnode = Math.floor((Math.random()*nodesX.length));
        				nodes3.push({X: nodesX[currentnode], Y: nodesY[currentnode]});
    				}

       				var lines3 = svg.selectAll(".network3")
       					.data(nodes3);	
       					lines3.enter().append("line")
	    					.attr("x1", function(d) {return d.X;})
	    					.attr("y1", function(d) {return d.Y;})
	    					.attr("x2", function(d,i) {if (i+1 < nodes3.length) {return nodes3[i+1].X;} else {return d.X};})
	    					.attr("y2", function(d,i) {if (i+1 < nodes3.length) {return nodes3[i+1].Y;} else {return d.Y};})
	    					// .attr("y2", function(d,i) {if (i%2 == 0){if (i+1 < numnodes) {return nodesY[i+1];} else {return nodesY[0];};}})
	       					.attr("class","network3");
       				     
       				lines3.exit().remove();
				} else if(event.fragment.id == "networks3"){
					$("#d3title").html("skip internodes");
					var line4 = svg.selectAll(".shortestpath")
       					.data(nodes3);	
       					line4.enter().append("line")
	    					.attr("x1", function(d) {return nodes3[0].X;})
	    					.attr("y1", function(d) {return nodes3[0].Y;})
	    					.attr("x2", function(d) {return nodes3[nodes3.length-1].X;})
	    					.attr("y2", function(d) {return nodes3[nodes3.length-1].Y;})
	    					// .attr("y2", function(d,i) {if (i%2 == 0){if (i+1 < numnodes) {return nodesY[i+1];} else {return nodesY[0];};}})
	       					.attr("class","shortestpath");
       				     
       				line4.exit().remove();
    			} else if(event.fragment.id == "networks4"){
    				$("#d3title").html("bring order");
    				
    				nodes = [];
    				// arrange as a circle
    				for (var i=0;i<numnodes;i++) { 
						nodesX[i] = Math.cos(i*2*Math.PI/numnodes)*radius + 1920/2;
						nodesY[i] = Math.sin(i*2*Math.PI/numnodes)*radius + 1080/2;
						}

    				for (var i = 0; i < nodesX.length; i++) {
        				nodes.push({X: nodesX[i], Y: nodesY[i]});
    				}			
    				nodes2 = [];
       				for (var i = 0; i < nodesX.length/2; i++) {
        				nodes2.push({X: nodesX[2*i], Y: nodesY[2*i]});
    				}	
    				nodes3 = [];
       				for (var i = 0; i < pathnodes; i++) {
       					currentnode = Math.floor((Math.random()*nodesX.length));
        				nodes3.push({X: nodesX[currentnode], Y: nodesY[currentnode]});
    				}


    				svg.selectAll("circle")
						.data(nodes)
    				  .transition()
    					.duration(750)
    					.attr("cy", function(d) {return d.Y;})
					    .attr("cx", function(d) {return d.X;});

					svg.selectAll(".network")
     					.data(nodes)
     				  .transition()
    					.duration(750)
    					.attr("x1", function(d) {return d.X;})
    					.attr("y1", function(d) {return d.Y;})
    					.attr("x2", function(d,i) {if (i+1 < numnodes) {return nodesX[i+1];} else {return nodesX[0]};})
    					.attr("y2", function(d,i) {if (i+1 < numnodes) {return nodesY[i+1];} else {return nodesY[0]};})
       				
       				svg.selectAll(".network2")
     					.data(nodes2)
     				  .transition()
    					.duration(750)
						.attr("x1", function(d) {return d.X;})
						.attr("y1", function(d) {return d.Y;})
						.attr("x2", function(d,i) {if (i+1 < nodes2.length) {return nodes2[i+1].X;} else {return nodes2[0].X};})
						.attr("y2", function(d,i) {if (i+1 < nodes2.length) {return nodes2[i+1].Y;} else {return nodes2[0].Y};})

					svg.selectAll(".network3")
     					.data(nodes3)
     				  .transition()
    					.duration(750)
						.attr("x1", function(d) {return d.X;})
						.attr("y1", function(d) {return d.Y;})
						.attr("x2", function(d,i) {if (i+1 < nodes3.length) {return nodes3[i+1].X;} else {return d.X};})
						.attr("y2", function(d,i) {if (i+1 < nodes3.length) {return nodes3[i+1].Y;} else {return d.Y};})


					svg.selectAll(".shortestpath")
     					.data(nodes3)
     				  .transition()
    					.duration(750)
     					.attr("x1", function(d) {return nodes3[0].X;})
    					.attr("y1", function(d) {return nodes3[0].Y;})
    					.attr("x2", function(d) {return nodes3[nodes3.length-1].X;})
    					.attr("y2", function(d) {return nodes3[nodes3.length-1].Y;})
       					.attr("class","shortestpath");
				} else if(event.fragment.id == "networks5"){
					$("#d3title").html("total chaos");
    				nodes = [];
    				for (var i = 0; i < numnodes*3; i++) {
        				nodes.push({X: window.d3state.w/2, Y: window.d3state.h/2});
    				}	
    				// console.log(nodesX)


    				svg.selectAll("circle")
						.data(nodes)
    				  .transition()
    					.duration(750)
    					.attr("cy", function(d) {return d.Y;})
					    .attr("cx", function(d) {return d.X;})
					    .attr("r", 50)
					    .attr("class", "converged");

					svg.selectAll("line")
			            .data(nodes)
			            .transition()
			              .duration(750)
			            .attr("x1",function(d) {return d.X;})
			            .attr("y1",function(d) {return d.Y;})
			            .attr("x2",function(d) {return d.X;})
			            .attr("y2",function(d) {return d.Y;})
				} else if(event.fragment.id == "networks6"){
					$("#d3title").html("chaos to stream");
					nodes = [];
    				
    				for (var i = 0; i < numnodes; i++) {
        				nodes.push({X: window.d3state.w/numnodes*i, Y: window.d3state.h/2});
    				}	

					svg.selectAll("circle")
						.data(nodes)
    				  .transition()
    					.duration(750)
    					.attr("cy", function(d) {return d.Y;})
					    .attr("cx", function(d) {return d.X;})
					    .attr("r", 12)
					    .attr("class", "circle");
				} else if(event.fragment.id == "datafilterscale1"){
					$(".tvinform1").addClass("tvinform2").removeClass("tvinform1");
				} else if(event.fragment.id == "datafilterscale2"){
					$(".tvinform2").addClass("tvinform3").removeClass("tvinform2");
				} else if(event.fragment.id == "atom"){
					$(".atom1").addClass("atom2").removeClass("atom1");
				} else if(event.fragment.id == "message2"){
					// console.log(blah);
					$("#filtertitle").html("and we are the publishers");
				}

			});
			Reveal.addEventListener( 'networkssvg', function() {
				//check if d3 slide has been activated()
				if (typeof window.d3state === 'undefined') {
					//alert("never been here before");
					//custom props
					window.d3state = {stage: 1 , w: 1920, h:1080};
					// console.log( 'svgtest' +window.d3state.stage+ ' has fired' );
				     // w = 1920,
				     // h = 1080;
				    //x = d3.scale.ordinal().domain([57, 32, 112]).rangePoints([0, w], 1),
				    //y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);
					window.svg = d3.select("#d3container").append("svg")
						.attr("version","1.1")
					    .attr("width", "100%")
					    .attr("height", "100%")
					    .attr("viewBox", "0 0 " + window.d3state.w + " " + window.d3state.h);

					
				} else {
					return;
				}



			});

			function fireD3 (svg,stage) {
					//d3.select("#d3container")


					console.log(stage);

			}

		  // $(function() {
			 //    $( ".slides" ).sortable();
			 //    $( ".slides" ).disableSelection();
			 //  });