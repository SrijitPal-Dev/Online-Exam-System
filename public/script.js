//counter variable
var counter;
//code for timer

// Update the count down every 1 second
var percentremain=0;
var distance = 3600000;
var fixed=new Date().getTime();
fixed+=distance;
var x = setInterval(function() {

  //Test time in milliseconds
  distance=fixed-(new Date().getTime());
	percentremain=(distance/36000.0);
  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = "Time remaining:<br/><div class='progress' style='margin-top:3%;'><div class='progress-bar progress-bar-striped' id='#bar' style='width:"+percentremain+"%;'>"+hours + " : "
  + minutes + " : " + seconds+"</div></div>";

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
	counter=61;
	submitgreen();
  }
}, 1000);

//end of code for timer

//code for counter;
counter=1;
var marked=[];
var submitted=[];
var visited=[];
var tickedoption=[];
var marksperquestion=[];
var rightans;
for(var i=0;i<60;i++)
{
	marked.push(0);
	submitted.push(0);
	visited.push(0);
	tickedoption.push(0);
	marksperquestion.push(0);
}
//changes the background color of marked question boxes in the grid
function setVisited(num)
{
	if(!visited[num-1])
	document.getElementById(""+num).style.backgroundColor="lightgray";
	visited[num-1]=1;
	for(var i=1;i<=60;i++)
	{
		document.getElementById(""+i).style.textDecoration="none";
	}
	document.getElementById(""+num).style.textDecoration="underline";
}
//valfunc: sets value of counter to the value that the user clicks on
function valfunc(num)
{
	counter=num;
	//enter your question here
	var question="question";
	//options
	var option1="option1";
	var option2="option2";
	var option3="option3";
	var option4="option4";
	if(num>1)
	{
		document.getElementById("prev").style.display="inline";
		if(num>60)
		{
			document.getElementById("next").style.display="none";
		}
		else
		{
			document.getElementById("next").style.display="inline";
		}
	}
	switch(num)
	{
		case 1:
		question="Who is the present Union Agriculture Minister?";
		option1="Raghuvansh Prasad Singh";
		option2="Manishankar Iyyer";
		option3="Sharad Pawar";
		option4="Kamalnath";rightans="3";
		document.getElementById("prev").style.display="none";
		break;
		case 2:
		question="Who is the present union Tourism and Culture Minister?";
		option1="Ambika Soni";
		option2="Kapil Sibbal";
		option3="Renuka Chaudhary";
		option4="Sushil Kumar Shinde";rightans="1";
		break;
		case 3:
		question="Who is the chairman of senior selection committee in BCCI?";
		option1="Sunil Gavaskar";
		option2="Dilip Vengasarkar";
		option3="Krishnamachari Srikkanth";
		option4="Chetan Chauhan";rightans="3";
		break;
		case 4:
		question="The assembly elections were held recently in two states namely";
		option1="Gujarat and Andhra Pradesh";
		option2="Madhya Pradesh and Himachal Pradesh";
		option3="Himachal Pradesh and Gujarat";
		option4="Andhra Pradesh and Himachal Pradesh";rightans="3";
		break;
		case 5:
		question="Thermometer is related to degree in the same way as clock is related to";
		option1="Wall";
		option2="Tower";
		option3="Hour";
		option4="Cock";rightans="3";
		break;
		case 6:
		question="The headquarters of the United Nations Union is located at";
		option1="Geneva";
		option2="New York";
		option3="Rome";
		option4="Washington";rightans="2";
		break;
		case 7:
		question="To work on mobile cell phone which of the following is/are required?";
		option1="Favourable handset";
		option2="Sim card";
		option3="Service provider network";
		option4="All of the above";rightans="4";
		break;
		case 8:
		question="Find the root value of 36.1 / 102.4";
		option1="61 / 34";
		option2="19 / 31";
		option3="19 / 32";
		option4="19 / 33";rightans="3";
		break;
		case 9:
		question="Which of the following keys of personal computer is not available in the key board of traditional typewriters?";
		option1="Tab";
		option2="Spacebar";
		option3="Enter";
		option4="Backspace";rightans="3";
		break;
		case 10:
		question="Which of the following words is not related to the functioning of Internet?";
		option1="www";
		option2="http";
		option3="e-mail";
		option4="MS Word";rightans="4";
		break;
		case 11:
		question="2008 Olympic games were held in";
		option1="China";
		option2="Greece";
		option3="Italy";
		option4="France";rightans="1";
		break;
		case 12:
		question="Who among the following has been appointed as the new Captain of Indian Test Cricket Team?";
		option1="Sachin Tendulkar";
		option2="Rahul Dravid";
		option3="Anil Kumble";
		option4="Mahender Singh Dhoni";rightans="4";
		break;
		case 13:
		question="Who among the following is  coach for the Indian Cricket Team?";
		option1="Vivian Richards";
		option2="Gary Kirsten";
		option3="Kapil Dev";
		option4="Allan Border";rightans="2";
		break;
		case 14:
		question="The mascot for the 34th National Games held in Jharkhand in 2008, is";
		option1="Sheru";
		option2="Roopa";
		option3="Chauva";
		option4="None of these";rightans="3";
		break;
		case 15:
		question="With which game is the Agha Khan Cup associated?";
		option1="Football";
		option2="Badminton";
		option3="Basketball";
		option4="Hockey";rightans="4";
		break;
		case 16:
		question="The term, L.B.W. is associated with which of the following games?";
		option1="Cricket";
		option2="Hockey";
		option3="Football";
		option4="Polo";rightans="3";
		break;
		case 17:
		question="Wankhede stadium is situated in?";
		option1="Chandigarh";
		option2="Bangalore";
		option3="Mumbai";
		option4="Chennai";rightans="1";
		break;
		case 18:
		question="The Olympic games are normally held at an interval of";
		option1="2 years";
		option2="3 years";
		option3="4 years";
		option4="5 years";rightans="3";
		break;
		case 19:
		question="Jaspal Rana is the name associated with which of the following games?";
		option1="Boxing";
		option2="Shooting";
		option3="Archery";
		option4="Weight lifting";rightans="3";
		break;
		case 20:
		question="Netaji Subhash National Institute of Sports is located at";
		option1="Kolkata";
		option2="New Delhi";
		option3="Jhansi";
		option4="Patiala";rightans="2";
		break;
		case 21:
		question="A person wants to contest election for the membership of Gram Panchayat, what should be his age?";
		option1="18 years or above";
		option2="19 years or above";
		option3="21 years or above";
		option4="Minimum 25 years";rightans="3";
		break;
		case 22:
		question="Who summons the joint sitting of the Rajya Sabha and Lok Sabha?";
		option1="President";
		option2="Speaker of the Lok Sabha";
		option3="Chairman of the Rajya Sabha";
		option4="Prime Minister";rightans="1";
		break;
		case 23:
		question="Which of the following is not a source of revenue to the village panchayat?";
		option1="Property Tax";
		option2="House Tax";
		option3="Land Tax";
		option4="Vehicle Tax";rightans="3";
		break;
		case 24:
		question="All electioneering campaigns during the time of elections are stopped.";
		option1="48 hours before the appointed time of election results";
		option2="48 hours before the actual poll";
		option3="48 hours before the actual poll";
		option4="48 hours before the actual poll";rightans="4";
		break;
		case 25:
		question="Who appoints the Chief Election Commissioner of India?";
		option1="President";
		option2="Prime Minister";
		option3="Parliament";
		option4="Chief Justice of India";rightans="1";
		break;
		case 26:
		question="The General Budget is presented in the parliament normally in the month of";
		option1="January";
		option2="February";
		option3="March";
		option4="Last month of the year";rightans="2";
		break;
		case 27:
		question="Who is the signatory on the Indian currency notes in denomination of two rupees and above?";
		option1="Secretary, Reserve Bank of India";
		option2="Finance Secretary, Minister of Finance";
		option3="Governor, Reserve Bank of India";
		option4="Finance Minister, Ministry of Finance";rightans="3";
		break;
		case 28:
		question="The monetary unit of Bangladesh is";
		option1="Rupee";
		option2="Takka";
		option3="Rupiah";
		option4="Dollar";rightans="2";
		break;
		case 29:
		question="Sellers market denotes a situation where";
		option1="Commodities are available at competitive rates";
		option2="Demand exceeds supply";
		option3="Supply exceeds demand";
		option4="Supply and demand are equal";rightans="2";
		break;
		case 30:
		question="Development means economic growth plus";
		option1="Inflation";
		option2="Deflation";
		option3="Price stability";
		option4="Social Change";rightans="4";
		break;
		case 31:
		question="The Abbreviation NAEP stands for";
		option1="National Atomic Energy Planning";
		option2="National Adult education Programme";
		option3="National Authority on Engineering Projects";
		option4="Nuclear and Atomic Energy Project";rightans="2";
		break;
		case 32:
		question="The Abbreviations PSLV stands for";
		option1="Polar Survey Landing Vehicle";
		option2="Polarised Source Laser Viewing";
		option3="Precise Source Locating Vision";
		option4="Polar Satellite Launch Vehicle";rightans="4";
		break;
		case 33:
		question="The term \'epicentre\' is associated with";
		option1="Earthquakes";
		option2="Tornadoes";
		option3="Cyclones";
		option4="Earth\'s interior";rightans="1";
		break;
		case 34:
		question="Which of the following order is given to the plantes of solar system on the basis of their sizes?";
		option1="Jupiter, Saturn, Earth, Mercury";
		option2="Saturn, Jupiter, Mercury, Earth";
		option3="Mercury, Earth, Jupiter, Saturn";
		option4="Earth, Mercury, Saturn, Jupiter";rightans="1";
		break;
		case 35:
		question="The solar eclipse occurs when";
		option1="the sun comes in between the moon and the earth";
		option2="the earth comes in the between the sun and the moon";
		option3="the moon comes in between the sun and the earth";
		option4="None of these";rightans="3";
		break;
		case 36:
		question="The removal of top soil by water or wind is called";
		option1="Soil wash";
		option2="Soil erosion";
		option3="Soil creep";
		option4="Sitting of soil";rightans="2";
		break;
		case 37:
		question="Which of the following is suitable for growing cotton?";
		option1="Sandy soil";
		option2="Clayey soil";
		option3="Black soil";
		option4="Alluvial soil";rightans="3";
		break;
		case 38:
		question="Bandipur Sanctuary is located in the State of";
		option1="Tamil Nadu";
		option2="Uttar Pradesh";
		option3="Karnataka";
		option4="Madhya Pradesh";rightans="3";
		break;
		case 39:
		question="Largest State in terms of area, in India is";
		option1="Assam";
		option2="Rajasthan";
		option3="Madhya Pradesh";
		option4="Jammu and Kashmir";rightans="2";
		break;
		case 40:
		question="Koraput is related to which of the following Industry";
		option1="Aeroplane";
		option2="Ship building";
		option3="Iron and steel";
		option4="Electric locomotives";rightans="1";
		break;
		case 41:
		question="Which of the following group of States is the largest producer of tea?";
		option1="West Bengal, Tamil Nadu, Himachal Pradesh";
		option2="Karnataka, Uttar Pradesh, Rajasthan";
		option3="Assam, Bihar, Jharkhand";
		option4="West Bengal, Assam, Karnataka";rightans="4";
		break;
		case 42:
		question="Which of these has the largest river basin?";
		option1="Brahmaputra";
		option2="Ganga";
		option3="Godavari";
		option4="Sutlej";rightans="2";
		break;
		case 43:
		question="The Indus Valley Civilization was famous for";
		option1="Well-planned cities";
		option2="Efficient civil organization";
		option3="Development of Art and Architecture";
		option4="All of these";rightans="4";
		break;
		case 44:
		question="The Red Fort of Delhi was built by";
		option1="Akbar";
		option2="Shahjehan";
		option3="Jahangir";
		option4="Sher Shah";rightans="2";
		break;
		case 45:
		question="The ancient name of the city of Patna is";
		option1="Patliputra";
		option2="Kanauj";
		option3="Kausambi";
		option4="Kapilavastu";rightans="1";
		break;
		case 46:
		question="The ancient kingdom of \"Avanti\" had its capital at";
		option1="Vaishali";
		option2="Kausambi";
		option3="Ujjain";
		option4="Ayodhya";rightans="3";
		break;
		case 47:
		question="When did Vasco-da-Gama come to India";
		option1="1492";
		option2="1498";
		option3="1398";
		option4="1542";rightans="2";
		break;
		case 48:
		question="The General who gave the firing order at Jallianwala Bag was";
		option1="Tegart";
		option2="Cornwallis";
		option3="Simpson";
		option4="O. Dwyer";rightans="4";
		break;
		case 49:
		question="Gandhiji started Satyagraha in 1919 to protest against the";
		option1="Rowlatt Act";
		option2="Salt Law";
		option3="Act of 1909";
		option4="Jallianwala Bagh Massacre";rightans="1";
		break;
		case 50:
		question="The Britishers come to India as traders and formed company named";
		option1="Indo-British Company";
		option2="The Great Britain Company";
		option3="Eastern India Company";
		option4="East India Company";rightans="4";
		break;
		case 51:
		question="Mahatma Gandhi was born in";
		option1="Wardha";
		option2="Porbander";
		option3="Sabarmati";
		option4="Ahmedabad";rightans="2";
		break;
		case 52:
		question="Who gave the slogan \"You give me blood, I promise you freedom\"?";
		option1="Bhagat Singh";
		option2="Chandra Shekhar Azad";
		option3="Subhash Chandra Bose";
		option4="Bal Gangadhar Tilak";rightans="3";
		break;
		case 53:
		question="In which State is Jawahar Tunnel located?";
		option1="Himachal Pradesh";
		option2="Uttaranchal";
		option3="Goa";
		option4="Jammu and Kashmir";rightans="4";
		break;
		case 54:
		question="Where did the dance form \"Mohini Attam\" develop?";
		option1="Manipur";
		option2="Kerala";
		option3="Karnataka";
		option4="Tamil Nadu";rightans="2";
		break;
		case 55:
		question="On selling three articles at the cost of four article, there will be profit of";
		option1="25%";
		option2="100/3%";
		option3="75/2%";
		option4="40%";rightans="3";
		break;
		case 56:
		question="By selling an article for Rs. 40, there is loss of 40%. By selling it for Rs. 80 there is";
		option1="Gain of 20%";
		option2="Loss of 10%";
		option3="Loss of 20%";
		option4="Gain of 10%";rightans="1";
		break;
		case 57:
		question="A number consists of two digits whose sum is 8. If 8 is subtracted from the number, the digits interchange their places. The number is";
		option1="44";
		option2="35";
		option3="62";
		option4="33";rightans="4";
		break;
		case 58:
		question="A horse is tied to a peg hammered at one of the corner of a rectangular grass field of 40 m by 24 m by a rope 14 m long. Over how much area of the field can the horse graze?";
		option1="154 m2";
		option2="308 m2";
		option3="240 m2";
		option4="480 m2";rightans="1";
		break;
		case 59:
		question="The sides of a triangle are in the ratio 3 : 5 : 7 and its perimeter is 30 cm. The length of the greatest side of the triangle in cm is";
		option1="6";
		option2="10";
		option3="14";
		option4="16";rightans="3";
		break;
		case 60:
		question="The radius of a right circular cone is 3 cm and its height is 4 cm. The curved surface of the cone will be";
		option1="12 sq. cm";
		option2="15 sq. cm";
		option3="18 sq. cm";
		option4="21 sq. cm";rightans="2";
		break;
		default:
		question="question";
		option1="option1";
		option2="option2";
		option3="option3";
		option4="option4";rightans="3";
		break;
	}
	if(num<=60)
	{
	document.getElementById("questionrow").innerHTML="Click \"submit\" to submit your answers and \"previous\" to go back";
		$(document).ready(function()
		{
			$("#undo").prop('disabled',false);
			$("#mark").prop('disabled',false);
			$("#unmark").prop('disabled',false);
		});	
	
	setVisited(num);	
		
	if(!tickedoption[num-1])
	document.getElementById("questionrow").innerHTML="<p>Q"+num+". "+question+"<form class='form-horizontal'><div class='radio'><ul class='list-unstyled'><li><label><input onchange='submission();' type='radio' name='question' value='1'>"+option1+"</input></label></li><li><label><input onchange='submission();' value='2' type='radio' name='question'>"+option2+"</input></label></li><li><label><input onchange='submission();' type='radio' value='3' name='question'>"+option3+"</input></label></li><li><label><input onchange='submission();' type='radio' value='4' name='question'>"+option4+"</input></label></li></div></form> </p>";
	else if(tickedoption[num-1]==1)
	document.getElementById("questionrow").innerHTML="<p>Q"+num+". "+question+"<form class='form-horizontal'><div class='radio'><ul class='list-unstyled'><li><label><input onchange='submission();' type='radio' name='question' value='1' checked>"+option1+"</input></label></li><li><label><input onchange='submission();' value='2' type='radio' name='question'>"+option2+"</input></label></li><li><label><input onchange='submission();' type='radio' value='3' name='question'>"+option3+"</input></label></li><li><label><input onchange='submission();' type='radio' value='4' name='question'>"+option4+"</input></label></li></div></form> </p>";
	else if(tickedoption[num-1]==2)
	document.getElementById("questionrow").innerHTML="<p>Q"+num+". "+question+"<form class='form-horizontal'><div class='radio'><ul class='list-unstyled'><li><label><input onchange='submission();' type='radio' name='question' value='1'>"+option1+"</input></label></li><li><label><input onchange='submission();' value='2' type='radio' name='question' checked>"+option2+"</input></label></li><li><label><input onchange='submission();' type='radio' value='3' name='question'>"+option3+"</input></label></li><li><label><input onchange='submission();' type='radio' name='question' value='4'>"+option4+"</input></label></li></div></form> </p>";
	else if(tickedoption[num-1]==3)
	document.getElementById("questionrow").innerHTML="<p>Q"+num+". "+question+"<form class='form-horizontal'><div class='radio'><ul class='list-unstyled'><li><label><input onchange='submission();' type='radio' name='question' value='1'>"+option1+"</input></label></li><li><label><input onchange='submission();' value='2' type='radio' name='question'>"+option2+"</input></label></li><li><label><input onchange='submission();' type='radio' name='question' value='3' checked>"+option3+"</input></label></li><li><label><input onchange='submission();' type='radio' name='question' value='4'>"+option4+"</input></label></li></div></form> </p>";
	else if(tickedoption[num-1]==4)
	document.getElementById("questionrow").innerHTML="<p>Q"+num+". "+question+"<form class='form-horizontal'><div class='radio'><ul class='list-unstyled'><li><label><input onchange='submission();' type='radio' name='question' value='1'>"+option1+"</input></label></li><li><label><input onchange='submission();' value='2' type='radio' name='question'>"+option2+"</input></label></li><li><label><input onchange='submission();' type='radio' name='question' value='3'>"+option3+"</input></label></li><li><label><input onchange='submission();' type='radio' name='question' value='4' checked>"+option4+"</input></label></li></div></form> </p>";
	}
	else
	{
		document.getElementById("questionrow").innerHTML="Click \"submit\" to submit your answers and \"previous\" to go back";
		$(document).ready(function()
		{
			$("#undo").prop('disabled',true);
			$("#mark").prop('disabled',true);
			$("#unmark").prop('disabled',true);
		});
	}
}
function submission()
{
	var options=document.getElementsByName('question');
	var ans=0;
	for(var i=0;i<options.length;i++)
	{
		if(options[i].checked)
		{
			ans=options[i].value;
			break;
		}
	}
	tickedoption[counter-1]=parseInt(ans);
}
//when submit button is clicked
function submitgreen()
{
	if(counter<=60)
	{
	if(tickedoption[counter-1]!=0)
	{
	submitted[counter-1]=1;
	var clr="lightgreen";
	if(marked[counter-1]==1)
	{
		clr="lightblue";
	}
	document.getElementById(""+counter).style.backgroundColor=clr;
	if(tickedoption[counter-1]==rightans)
	{
		marksperquestion[counter-1]=3;
	}
	else
	{
		marksperquestion[counter-1]=-1;
	}
	}
	else
	{
		alert("Please select an option before submission");
	}
	}
	else
	{
		//final submission code
		var sum=0;
		var visi=0;
		var correct=0;
		var incorrect=0;
		var unattempted=0;
		for(var i=0;i<60;i++)
		{
			if(submitted[i])
			{
				sum+=marksperquestion[i];
				if(marksperquestion[i]>0)
				{
					correct++;
				}
				else
				{
					incorrect++;
				}
			}
			else
			{
				unattempted++;
			}
			if(visited[i])
			{
				visi++;
			}
		}
		$(document).ready(function(){
			$(".content").empty();
			$(".foot").empty();
			$(".content").html("<center><table style='width:50%' class='table table-responsive table-bordered'><tr class='info'><th>Number of questions visited</th><td>"+visi+"</td></tr><tr class='success'><th>Number of successful attempts</th><td>"+correct+"</td></tr><tr class='danger'><th>Number of incorrect attempts</th><td>"+incorrect+"</td></tr><tr class='warning'><th>Number of unattempted questions</th><td>"+unattempted+"</td></tr><tr class='active'><th>Total marks obtained</th><td>"+sum+"</td></tr></table></center>");
		});
	}
}
//when mark button is clicked
function markpurple()
{
	marked[counter-1]=1;
	var clr="pink";
	if(submitted[counter-1])
	{
		clr="lightblue";
	}
	document.getElementById(""+counter).style.backgroundColor=clr;
}
//when unmark button is clicked
function unmark()
{
	marked[counter-1]=0;
	if(submitted[counter-1])
	{
		submitgreen(counter);
	}
	else
	{
		document.getElementById(""+counter).style.backgroundColor="lightgray";
	}
}
//when undo button is clicked
function undo()
{
	submitted[counter-1]=0;
	tickedoption[counter-1]=0;
	marksperquestion[counter-1]=0;
	if(marked[counter-1])
	{
		document.getElementById(""+counter).style.backgroundColor="pink";
	}
	else
	{
		document.getElementById(""+counter).style.backgroundColor="lightgray";
	}
	var options=document.getElementsByName('question');
	for(var i=0;i<options.length;i++)
	{
			options[i].checked=false;
	}
}

