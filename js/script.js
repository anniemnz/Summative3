$(function() {

  // jquery coding inside this function
  let key = 'uvF145qvSLKIWMiedZfpdGxSH8lmHajb';


  	if($('#behance-api').length>0){
		let urlProjects = 'https://api.behance.net/v2/users/ilonaveresk/projects?client_id='+key; 
		$.ajax({
			url: urlProjects,
			dataType: 'jsonp',
			success: function(res){

				let projects = res.projects;
				_(projects).each(function(project){
					$('<li>'+project.name+'<img src="'+project.covers.original+'"><a href="project.html?projectid='+project.id+'">see more</a></li>')
					.appendTo('ul.projects');
				});
			}			
		});
	}

		if($('#project').length>0){
		let pageURL = new URL(document.location);
		let params = pageURL.searchParams;
		let projectid = params.get('projectid');

		let urlProject = 'http://www.behance.net/v2/projects/'+projectid+'?api_key='+key;

		$.ajax({
			url: urlProject,
			dataType: 'jsonp',
			success: function(res){
				let project = res.project;

				$('<h1>'+project.name+'</h1>').appendTo('behance-container');
				$('<p>'+project.description+'</p>').appendTo('behance-container');
				// $('<h3>'+moment.unix(project.published_on).fromNow()+'</h3>').appendTo('behance-container');
				$('<img src="'+project.covers.original+'">').appendTo('behance-container');
			}
		});
	}
	
});