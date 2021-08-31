$(function(){
    var searchField=$('#query')
    var icon=$("#search-btn")

    $(searchField).on('focus',function(){
        $(this).animate({
            width:'100%'
        },400)
        &(icon).animate({
            right:'10px'

        },400)

    })
    $(searchField).on('blur',function(){
        if(searchField.val==''){
            $(searchField).animate({
                width:'45%'
            },400,function(){})
            $(icon).animate({
                right:'360px'

            },400,function(){})
        }
    })
    $('#search-form').submit(function(e){
        e.preventDefault()
    })
})
function search(){
    $('#results').html('');
    $('#butons').html('');

    q=$('#query').val()

    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part:'snippet,id',
            q:q,
            type:'video',
            key:'AIzaSyDI9KitS2aduNR9OT62TrFsWH5dRL_Ygmg'},

            function(data){
                var nextPageToken=data.nextPageToken
                var prevPageToken=data.prevPageToken


                $.each(data.items,function(i,item){
                    var output=getOutput(item)
                    $('#results').append(output)
                })
            }
    )
}
function getOutput(item){
    var videoId=item.id.videoId
    var title=item.snippet.title
    var descriptioon=item.snippet.descriptioon
    var thumb=item.snippet.thumb
    var channelTitle=item.snippet.channelTitle
    var videoDate=item.snippet.publishedAt

    var output='<li>'+
    '<div class="list-left">'+
    '<img src="'+thumb+'">'
    '</div>'+
    '<div class="list-left">'+
    '<h3>'+thumb+'></h3>'+
    '<small>By <span class="cTitle">'+channelTitle+'</span> on'+videoDate+'</smalll>'+
    '<p>'+descriptioon+'</p>'+
    '</div>'+
    '</li>'+
    '<div classs="clearfix"></div>'+
    ''

    return output
}
function getButtons(prevPageToken,nextPageToken){
    if(!prevPageToken){
        var btnoutput='<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"'+
        'onclick="nextPage()">Next Page</button></div>'
    } else{
        var btnoutput='<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+prevPageToken+'"data-query="'+q+'"'+
        'onclick="prevPage()">Prev Page</button>'+ '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"'+
        'onclick="nextPage()">Next Page</button></div>'

    }
    return btnoutput
}