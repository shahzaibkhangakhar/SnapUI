var baseurl = 'https://www.snap.getboxxie.com/api'


//.....................................................................................................................................................
//header
var form = new FormData()
form.append('site_id', '1')
form.append('slug', 'header')

console.log('Base URL is ', baseurl)
var settings = {
  url: `${baseurl}/navigation/get`,
  method: 'POST',
  timeout: 0,
  headers: {
    Accept: 'application/json'
  },
  processData: false,
  mimeType: 'multipart/form-data',
  contentType: false,
  data: form
}

$.ajax(settings).done(function (response) {
  // console.log(response);
  $('#navlist')
    .empty()
    .append(
      JSON.parse(response).data.map(RD => {
        return `<li class="nav-item">
                    <a class="nav-link" href="${RD.url}">${RD.title}</a>
                </li>`
      })
    )
})
$.ajax(settings).fail(function (res, err) {
  console.log('Response', res.status)
  if (res.status == 0) {
    console.log('Header internet issue')
    Swal.fire('Failed!!', 'Please Check your internet connection ', 'error')
  } else {
    Swal.fire('Failed!!', 'Please Check Server or Contact Admin ', 'error')
  }
})


//..................................................................................................................................................

//footer
var form = new FormData()
form.append('site_id', '1')
form.append('slug', 'footer')

var settings1 = {
  url: `${baseurl}/navigation/get`,
  method: 'POST',
  timeout: 0,
  headers: {
    Accept: 'application/json'
  },
  processData: false,
  mimeType: 'multipart/form-data',
  contentType: false,
  data: form
}

$.ajax(settings1).done(function (response) {
  // console.log(response);
  $('#footer-list')
    .empty()
    .append(
      JSON.parse(response).data.map(RD => {
        return `<div class="col-lg-4">
                    <div class="footer-link mt-lg-0 mt-4">
                        <h4 class="lead font-weight-bold text-white mb-3">${
                          RD.title
                        }</h4>

                        <ul class="list-unstyled">
                            ${RD.subtabs.map(
                              ST =>
                                `<li><a href="${ST.url == null ? "#" : ST.url}">${ST.title}</a></li>`
                            )}
                            
                        </ul>
                    </div>
                </div>`
      })
    )
})
$.ajax(settings1).fail(function (res, err) {
  console.log('Response', res.status)
  if (res.status == 0) {
    console.log('Footer internet issue')
    Swal.fire('Failed!!', 'Please Check your internet connection ', 'error')
  } else {
    Swal.fire('Failed!!', 'Please Check Server or Contact Admin ', 'error')
  }
})

//...............................................................................................................................................................
//footer-lexiconapi
var form = new FormData()
form.append('site_id', '1')
form.append('slug', 'footer')

var settings = {
  url: `${baseurl}/lexicon/get`,
  method: 'POST',
  timeout: 0,
  headers: {
    Accept: 'application/json'
  },
  processData: false,
  mimeType: 'multipart/form-data',
  contentType: false,
  data: form
}

$.ajax(settings).done(function (response) {
  var footerdata = JSON.parse(response).data.value
  // console.log("footer data" , footerdata)
  $('#footer-lexiconapi')
    .empty()
    .append(
      `
   
    <div class="footer-about pr-xl-5 pr-lg-4">
      <div class="footer-logo mb-3">
        <img src="images/logo.svg" class="img-fluid d-block" alt="Snap">
      </div>

      <p class="text-white font-weight-medium">${footerdata}</p>
    </div>
 
    
    `
    )
})

//...............................................................................................................................................................

//taxomony (upper-list)

var settings2 = {
  url: `${baseurl}/taxonomy/get`,
  method: 'GET',
  timeout: 0,
  headers: {
    Accept: 'application/json'
  }
}

$.ajax(settings2).done(function (response) {
  console.log(response)
  $('#taxonomy')
    .empty()
    .append(
      response.data.map(RD => {
        return `<li class="nav-item dropdown has-megamenu">
                    <a class="nav-link dropdown-toggle" href=${
                      RD.name
                    } data-toggle="dropdown">${RD.name}</a>
                    <div class="dropdown-menu megamenu">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="col-megamenu">
                                    <ul class="list-unstyled">
                                        ${RD.tabs
                                          .map(
                                            ST =>
                                              `<li><a id='${ST.id}'> ${
                                                ST.name
                                              }</a></li>
                                              <script>${'$'}('#${
                                                ST.id
                                              }').click(function (event) {
                                                console.log('${
                                                  ST.key
                                                } called');
                                                

${`


  var form = new FormData();
  form.append("taxonomy_key", ${ST.key});
  form.append("site_id", "1");

  
  var settings = {
    "url": "https://www.snap.getboxxie.com/api/search-snap/taxonomy",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Accept": "application/json"
    },
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };
  
  $.ajax(settings).done(function (response) { 
    
    
    localStorage.removeItem('searcheddata')
    localStorage.setItem('searcheddata', response)
    
    console.log('data from search by service from index page', response)
    var responsedata=(JSON.parse(response).data);
    console.log(responsedata);
 
    if (responsedata[0]==null) {
      Swal.fire(
        'Failed!!',
        'No Data Found',
        'error'
      );
 
    }
    else {
    
      window.location.replace('list.html');
    }


  });
  $.ajax(settings).fail(function (res, err) {
    // console.log("Response", res.status);
    if (res.status == 0) {

      console.log("internet issue");
      Swal.fire(
        'Failed!!',
        'Please Check your internet connection ',
        'error'
      );

    }
    else {
      Swal.fire(
        'Failed!!',
        'Please Check Server or Contact Admin ',
        'error'
      );
    }
  });
  
  
  `}


                                                
                                              })</script>`
                                          )
                                          .join('')}											
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4 ml-auto">
                                <div class="col-megamenu col-megamenu-link">
                                    <ul class="list-unstyled">
                                        <li><a href="#" class="nav-link-all text-primary">See all hair
                                                treatments</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
               
      </ul>`
      })
    )
    .append('')
})
$.ajax(settings2).fail(function (res, err) {
  console.log('Response', res.status)
  if (res.status == 0) {
    console.log('Taxonamy internet issue')
    Swal.fire('Failed!!', 'Please Check your internet connection ', 'error')
  } else {
    Swal.fire('Failed!!', 'Please Check Server or Contact Admin ', 'error')
  }
})
//........................................................................................................................................................................
$('input[type="radio"]').on('change ', function(e) {
 
  console.log(e.target.value);

  window.filter=e.target.value;
  // console.log("these are filters",window.filter);
  
});

//search through services
$('#throughservices').submit(function (event) {
  event.preventDefault()
  let [min, max] = $('#price')
    .val()
    .split(';')
  console.log('price from', min)
  console.log('price to', max)
  var form = new FormData()
  form.append('title', $('#title').val())
  form.append('location', $('#location').val())
  form.append('price_from', min)
  form.append('price_to', max)
  form.append('site_id', '1')
  form.append("interested_in", window.filter);

  $.ajax({
    url: `${baseurl}/search-snap/service`,
    method: 'POST',
    timeout: 0,
    headers: {
      Accept: 'application/json'
    },
    processData: false,
    mimeType: 'multipart/form-data',
    contentType: false,
    data: form,
    success: function (response) {
      alert('Search Complete')
      localStorage.removeItem('searcheddata')
      localStorage.setItem('searcheddata', response)
      console.log('data from search by service from index page', response)
      var datares= JSON.parse(response).data[0]
      if (datares==null) {
        Swal.fire(
          'Failed!!',
          'No Data Found',
          'error'
        );
   
      }
      else {
        window.location.replace('list.html');
      
      }
 

      // window.location.replace('login.html');
    },
    error: function (e) {
      console.log('Search through services Error', e)
      if (e.status == 404) {
        Swal.fire('Failed!!', 'Not Found Anything', 'error')
      } else if (e.status == 0) {
        Swal.fire('Failed!!', 'Please Check your internet connection ', 'error')
      } else {
        Swal.fire(
          'search through service Failed!!',
          'Please Check Server or Contact Admin ',
          'error'
        )
      }
      console.log('ERROR: ', e)
    }
  })
})

//.......................................................................................................................................

//search through venue
$('#throughvenue').submit(function (event) {
  event.preventDefault()
  var form = new FormData()
  form.append('venue_name', $('#venuename').val())
  form.append('service_title', $('#searchtitle').val())
  form.append('site_id', '1')

  var settings = {}

  $.ajax({
    url: `${baseurl}/search-snap/venue`,
    method: 'POST',
    timeout: 0,
    headers: {
      Accept: 'application/json'
    },
    processData: false,
    mimeType: 'multipart/form-data',
    contentType: false,
    data: form,
    success: function (response) {
      localStorage.removeItem('searcheddata')
      alert('Search Complete through venue')
      localStorage.setItem('searcheddata', response)
      console.log('data from search by venue from index page', response)
      var datares= JSON.parse(response).data[0]
      if (datares==null) {
        Swal.fire(
          'Failed!!',
          'No Data Found',
          'error'
        );
   
      }
      else {
        window.location.replace('list.html');
      
      }
    },
    error: function (e) {
      console.log('Search through services Error', e)

      if (e.status == 401) {
        Swal.fire('Failed!!', 'Not found any thing ', 'error')
      } else if (e.status == 0) {
        Swal.fire('Failed!!', 'Please Check your internet connection ', 'error')
      } else {
        Swal.fire(
          'search through venue Failed!!',
          'Please Check Server or Contact Admin ',
          'error'
        )
      }
      console.log('ERROR: ', e)
    }
  })
})
//................................................................................................................
//lexicon-homepost
var form = new FormData()
form.append('site_id', '1')
form.append('slug', 'home-post')

var settings = {
  url: `${baseurl}/lexicon/get`,
  method: 'POST',
  timeout: 0,
  headers: {
    Accept: 'application/json'
  },
  processData: false,
  mimeType: 'multipart/form-data',
  contentType: false,
  data: form
}

$.ajax(settings).done(function (response) {
  // console.log(response)
  var indexdata = JSON.parse(response).data.value

  $('#lexiconhome-post')
    .empty()
    .append(
      `
					<h3 class="feature-title"> ${indexdata}</h3>
			`
    )
})

//................................................................................................................
//getpost api -home

var form = new FormData()
form.append('site_id', '1')
form.append('slug', 'home')

var settings = {
  url: `${baseurl}/page-posts/get`,
  method: 'POST',
  timeout: 0,
  headers: {
    Accept: 'application/json'
  },
  processData: false,
  mimeType: 'multipart/form-data',
  contentType: false,
  data: form
}

$.ajax(settings).done(function (response) {
  // console.log(response)
  var data = JSON.parse(response).data[0].manual_stories
  // console.log ("data from page api", data)
  $('#getpost-home')
    .empty()
    .append(
      `
	
        <div id="getpost-home" class="row justify-content-center">
				<div class="col-lg-3">
					<div class="feature-box text-center">
						<div class="feature-box-image mb-4">
							<img src="https://www.arslanjewellers.com/snap/public/storage/library/610e8d19594cc.png" class="img-fluid" alt="">
						</div>
						<h4 class="py-2">${data[0].title}</h4>
						<p>${data[1].description}</p>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="feature-box text-center">
						<div class="feature-box-image mb-4">
							<img src="https://www.arslanjewellers.com/snap/public/storage/library/610e8d1b3fb89.png" class="img-fluid" alt="">
						</div>
						<h4 class="py-2">${data[1].title}</h4>
						<p>${data[1].description}</p>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="feature-box text-center">
						<div class="feature-box-image mb-4">
							<img src="https://www.arslanjewellers.com/snap/public/storage/library/610e8d1a7fe44.png" class="img-fluid" alt="">
						</div>
						<h4 class="py-2">${data[2].title}</h4>
						<p>${data[1].description}</p>
					</div>
				</div>
			</div>
      

    
  
  `
    )
})

//.................................................................................................................................

//.................................................................

//.................................................................................