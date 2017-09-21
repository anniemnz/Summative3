$(function() {

  	// jquery coding inside this function
  	let key = 'uvF145qvSLKIWMiedZfpdGxSH8lmHajb';

  	let portfolioHTML = $('#portfolio-template').text();
	let portfolioTemplate = Template7(portfolioHTML).compile();

	 	if($('#behance-api').length>0){
		let urlProjects = 'https://api.behance.net/v2/users/ilonaveresk/projects?client_id='+key; 
		$.ajax({
			url: urlProjects,
			dataType: 'jsonp',
			success: function(res){

				let projects = res.projects;
				_(projects).each(function(project,index){

					if(index<6){
						// console.log(project);
						let output = portfolioTemplate(project);
						$(output).appendTo('.project-container')						
					}					
				});
			}			
		});
	}
	
});


