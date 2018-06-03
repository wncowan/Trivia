$(document).ready(function(){
    var count = 0;
    var score = 0;
    $.get("https://opentdb.com/api.php?amount=10&category=18", function(data){
        console.log(data);
        $("#category").append("<h3>" + data.results[0].category + "</h3>");
        for(let i = 0; i < data.results.length; i++){
            var question = data.results[i].question;
            if(data.results[i].difficulty == "easy"){
                var points = 100;
            }
            else if(data.results[i].difficulty == "medium"){
                var points = 200;
            }
            else{
                var points = 300;
            }
            var selection = "<form><input type='radio' class='answer' name='answer' value=" + points + ">" + data.results[i].correct_answer + "<br>";
            for(let j = 0; j<data.results[i].incorrect_answers.length; j++){
                selection += "<input type='radio' class='answer' name='answer' value=" + -points + ">" + data.results[i].incorrect_answers[j] + "<br>";
            }
            selection += "</form>";
            
            $("#questions").append(`<button class='question'><p id='points'>${points}</p><p class='questioninfo'>${question}</p><p id='choices'>${selection}</p></button>`)
        }
        $(".questioninfo").hide();
        $("form").hide();
    })

    $(document).on("click", ".question", function startGame(){
        
        $(this).children("#points").hide();
        $(this).children(".questioninfo").show();
        $(this).children("form").show();
        // $(document).off("click", "#question");

        $(this).on('click', '.answer', function(){
            console.log(this);

            var answer = $(this).val();
            score += parseInt(answer);
            document.getElementById("score").innerHTML = `${score} points`;
            if(answer > 0){
                $(this).parents(".question").html("<p>Answered Correctly</p>").attr('class', "btn btn-lg btn-secondary");
            }
            else{
                $(this).parents(".question").html("<p>Answered Incorrectly</p>").attr('class', "btn btn-lg btn-secondary");
            }
            count++;
            if(count>10){ //if player answered all the questions link to generate new list of questions will be displayed
                $("#newquestions").show();
            }
        });
    });


});