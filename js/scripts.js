/*
* Author: Mahmoud Eid.
* Description: jQuery pagination and filter.
* Browsers the project was checked: Google Chrome, Mozilla Firefox, Safari.
*/

var $page = $('.page');
var $currentPage =  1;
var itemsPerPage = 10;
var $numberOfPages;
var $studentsList = $('.student-list li');
var $studentsCount = $studentsList.length;
var $studentDetails = $('.student-list li .student-details');
var $searchForm;
var $searchButton;
var $searchInput;

/*
* Add search form to page.
*/
function addSearchForm() {
	$searchForm = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';
	$('.page-header').append($searchForm);
	$searchButton = $('.student-search button');
	$searchInput = $('.student-search input');
}

/*
* On click search button.
* Get search input value and convert it to lower case.
* Then call filterStudents function and pass the converted value.
*/
function search() {
	$searchButton.on("click", function(){
		filterStudents($searchInput.val().toLowerCase());
	});
}

/*
* Filter students that match name or email.
* Call paginate function and pass match students list.
*/
function filterStudents($searchInputValue) {
	// Remove any previous search
	$studentsList.removeClass('match-search');
	// If pervious search show no matches message remove it.
	$('.no-matches').remove();

	// Check if not empty search input value filter students.
	// Else show all students.
	if($searchInputValue !== ''){
		// Hide all students list.
		$studentsList.hide();
		// Loop through students details and check if any text (name, email) match search input value.
		$studentDetails.each(function () {
			if($(this).text().toLowerCase().match($searchInputValue)){
				// Show match list.
				$(this).parent().show();
				// Add new class to match list to collect all students to pass them to paginate function.
				$(this).parent().addClass('match-search');
			}
		});
		// Select all lists that have .match-search class.
		$studentsList = $('.student-list .match-search');
		$studentsCount = $studentsList.length;
		// Check if students count is 0 show no result message.
		if($studentsCount === 0){
			var $noResultMessage = '<p class="no-matches">Sorry, there are no matches!</p>';
			$('.student-list').append($noResultMessage);
		}

	}else{
		// Select original students lists
		$studentsList = $('.student-list li');
		$studentsCount = $studentsList.length;
	}
	// Call paginate function and pass currentPage which equal 1 and the new students lists.
	paginate(1, $studentsList);
}

/*
* Add pagination links to page.
*/
function addPaginationLinks($numberOfPages) {
	// Remove any previous pagination.
	$('.pagination').remove();
	if($numberOfPages > 1){
		var $pagination = '';
		$pagination += '<div class="pagination">';
		$pagination += '<ul>';
		for (var i = 1; i <= $numberOfPages; i++) {
			$pagination += '<li><a href="#">'+i+'</a></li>';
		}
		$pagination += '</ul>';

		$page.append($pagination);
	}
}

/*
* Paginate through current page and current students lists.
*/
function paginate($currentPage, $studentsList) {
	// Hide students lists
	$studentsList.hide();
	// Show current page data.
	$studentsList.slice(($currentPage -1) * itemsPerPage, $currentPage * itemsPerPage).show();
	// Check if current page is page one call addPaginationLinks and clickPage functions.
	if($currentPage === 1){
		$numberOfPages = Math.ceil($studentsCount / itemsPerPage);
		addPaginationLinks($numberOfPages);
		clickPage();
	}
	// set active class
	$('.pagination ul li a').removeClass( "active" );
	$('.pagination ul li:nth-child('+ ($currentPage) +') a').addClass( "active" );
}

/*
* On click search pagination li.
* Get currentPage and pass it and current students lists to paginate function.
*/
function clickPage() {
	$('.pagination ul li').on("click", function(){
		$currentPage = parseInt($(this).text());
		paginate($currentPage, $studentsList);
	});
}

// Call functions on page load.
addSearchForm();
search();
paginate($currentPage, $studentsList);
clickPage();