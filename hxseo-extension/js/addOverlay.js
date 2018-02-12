var editInlineOverlay = `
<style>
#editInlineOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
  border-bottom: 1px solid rgba(0,0,0,0.4);
  height: 32px;
  background: rgba(255,255,255,0.9);
  box-shadow: 0px 1px 1px #fff;
  padding: 0px 10px;
  display: inline-flex;
}
#editInlineOverlay > .editInlineButton,
#editInlineOverlay .editInlineDropdown {
  margin: 0;
  border: 0;
  color: #000;
  font-size: 16px;
  padding: 0px 15px;
  min-width: 30px;
  min-height: 100%;
  display: inline-flex;
  align-items: center;
  background: transparent;
  position: relative;
}
#editInlineOverlay > .editInlineButton:hover,
#editInlineOverlay .editInlineDropdown:hover {
  background: rgba(0, 0, 0, 0.1);
}
#editInlineOverlay .editLine:after {
  border-right: 1px solid rgba(0, 0, 0, 0.6);
  content: " ";
  position: absolute;
  right: -1px;
  top: 0;
  bottom: 0;
}
#editInlineOverlay .editInlineDropdown .caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px solid\9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 4px solid #000;
}
#editInlineOverlay .dropdown {
  display: inline-block;
  position: relative;
}
#editInlineOverlay .dropdown-content {
  position: absolute;
  top: 31px;
  left: 0;
  width: 200px;
  border: 1px solid rgba(0,0,0,0.2);
  background: rgba(255,255,255,0.9);
  margin: 0;
}
#editInlineOverlay .dropdown-content a {
  text-decoration: none;
  color: #000;
  margin: 0;
  display: block;
  padding: 5px;
  line-height: 1em;
}
#editInlineOverlay .dropdown-content a h1,
#editInlineOverlay .dropdown-content a h2,
#editInlineOverlay .dropdown-content a h3,
#editInlineOverlay .dropdown-content a h4,
#editInlineOverlay .dropdown-content a h5,
#editInlineOverlay .dropdown-content a h6 {
  margin: 0;
}
#editInlineOverlay .dropdown-content a:hover {
  background: rgba(100,100,100,0.1);
}
#ContentArea .editInlineTextarea {
  width: 100%;
  height: 100%;
  min-height: 800px;
  font-size: 16px;
}
</style>
<div id='editInlineOverlay' contenteditable="false">
  <button class="editInlineButton" data-toggle="bold" title="Bold"><strong>B</strong></button>
  <button class="editInlineButton" data-toggle="italic" title="Italic"><em>I</em></button>
  <button class="editInlineButton" data-toggle="underline" title="Underline"><u>U</u></button>
  <button class="editInlineButton editLine" data-toggle="strikethrough" title="Strikethrough"><strike>S</strike></button>
  <button class="editInlineButton" data-toggle="createlink" data-input="Please enter the url to link to" title="Insert link"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
<path fill="#000000" d="M10.682 12.998c-0.943 0-1.886-0.359-2.604-1.077-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0c1.046 1.046 2.747 1.046 3.793 0l3.636-3.636c1.046-1.046 1.046-2.747 0-3.793s-2.747-1.046-3.793 0l-3.068 3.068c-0.195 0.195-0.512 0.195-0.707 0s-0.195-0.512 0-0.707l3.068-3.068c1.436-1.436 3.772-1.436 5.207 0s1.436 3.772 0 5.207l-3.636 3.636c-0.718 0.718-1.661 1.077-2.604 1.077z"></path>
<path fill="#000000" d="M4.682 18.998c-0.943 0-1.886-0.359-2.604-1.077-1.436-1.436-1.436-3.772 0-5.207l3.636-3.636c1.436-1.436 3.772-1.436 5.207 0 0.195 0.195 0.195 0.512 0 0.707s-0.512 0.195-0.707 0c-1.046-1.046-2.747-1.046-3.793 0l-3.636 3.636c-1.046 1.046-1.046 2.747 0 3.793s2.747 1.046 3.793 0l3.068-3.068c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-3.068 3.068c-0.718 0.718-1.661 1.077-2.604 1.077z"></path>
</svg></button>
  <button class="editInlineButton" data-toggle="unlink" title="Delete link"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
<path fill="#000000" d="M13.5 11.5c-0.128 0-0.256-0.049-0.354-0.146-0.195-0.195-0.195-0.512 0-0.707l3.068-3.068c0.507-0.507 0.786-1.18 0.786-1.896s-0.279-1.39-0.786-1.896c-1.046-1.046-2.747-1.046-3.793 0l-3.068 3.068c-0.195 0.195-0.512 0.195-0.707 0s-0.195-0.512 0-0.707l3.068-3.068c1.436-1.436 3.772-1.436 5.207 0 0.695 0.695 1.078 1.62 1.078 2.604s-0.383 1.908-1.078 2.604l-3.068 3.068c-0.098 0.098-0.226 0.147-0.354 0.147z"></path>
<path fill="#000000" d="M4.682 19c-0.983 0-1.908-0.383-2.604-1.078-1.436-1.436-1.436-3.772 0-5.207l3.068-3.068c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-3.068 3.068c-1.046 1.046-1.046 2.747 0 3.793 0.507 0.507 1.18 0.786 1.896 0.786s1.39-0.279 1.896-0.786l3.068-3.068c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-3.068 3.068c-0.695 0.695-1.62 1.078-2.604 1.078z"></path>
<path fill="#000000" d="M5.5 7c-0.128 0-0.256-0.049-0.354-0.146l-2-2c-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0l2 2c0.195 0.195 0.195 0.512 0 0.707-0.098 0.098-0.226 0.146-0.354 0.146z"></path>
<path fill="#000000" d="M7.5 6c-0.276 0-0.5-0.224-0.5-0.5v-3c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v3c0 0.276-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M4.5 9h-3c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M15.5 17c-0.128 0-0.256-0.049-0.354-0.146l-2-2c-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0l2 2c0.195 0.195 0.195 0.512 0 0.707-0.098 0.098-0.226 0.146-0.354 0.146z"></path>
<path fill="#000000" d="M17.5 13h-3c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M11.5 19c-0.276 0-0.5-0.224-0.5-0.5v-3c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v3c0 0.276-0.224 0.5-0.5 0.5z"></path>
</svg></button>
  <button class="editInlineButton editLine" data-toggle="insertimage" data-input="Please enter the image url" title="Inert image"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
<path fill="#000000" d="M18.5 20h-17c-0.827 0-1.5-0.673-1.5-1.5v-17c0-0.827 0.673-1.5 1.5-1.5h17c0.827 0 1.5 0.673 1.5 1.5v17c0 0.827-0.673 1.5-1.5 1.5zM1.5 1c-0.276 0-0.5 0.224-0.5 0.5v17c0 0.276 0.224 0.5 0.5 0.5h17c0.276 0 0.5-0.224 0.5-0.5v-17c0-0.276-0.224-0.5-0.5-0.5h-17z"></path>
<path fill="#000000" d="M13 9c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2zM13 6c-0.551 0-1 0.449-1 1s0.449 1 1 1 1-0.449 1-1-0.449-1-1-1z"></path>
<path fill="#000000" d="M17.5 2h-15c-0.276 0-0.5 0.224-0.5 0.5v12c0 0.276 0.224 0.5 0.5 0.5h15c0.276 0 0.5-0.224 0.5-0.5v-12c0-0.276-0.224-0.5-0.5-0.5zM3 11.69l3.209-3.611c0.082-0.092 0.189-0.144 0.302-0.145s0.221 0.048 0.305 0.138l5.533 5.928h-9.349v-2.31zM17 14h-3.283l-6.169-6.61c-0.279-0.299-0.651-0.461-1.049-0.456s-0.766 0.176-1.037 0.481l-2.462 2.77v-7.185h14v11z"></path>
</svg></button>
  <button class="editInlineButton" data-toggle="insertorderedlist" title="Number list"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
<path fill="#000000" d="M19.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M19.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M19.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M1.5 7c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM1.5 5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z"></path>
<path fill="#000000" d="M1.5 12c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5c0 0.827-0.673 1.5-1.5 1.5zM1.5 10c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z"></path>
<path fill="#000000" d="M1.5 17c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM1.5 15c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z"></path>
</svg></button>
  <button class="editInlineButton editLine" data-toggle="insertunorderedlist" title="Unordered list"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
<path fill="#000000" d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
<path fill="#000000" d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
</svg></button>
  <div class="dropdown">
    <button class="editInlineDropdown" data-target="#headerDropdown" title="Heading tags">Headings <span class="caret"></span></button>
    <div id="headerDropdown" class="dropdown-content hide">
      <a class="editInlineButton" data-toggle="formatblock" data-type="h1"><h1>Heading 1</h1></a>
      <a class="editInlineButton" data-toggle="formatblock" data-type="h2"><h2>Heading 2</h2></a>
      <a class="editInlineButton" data-toggle="formatblock" data-type="h3"><h3>Heading 3</h3></a>
      <a class="editInlineButton" data-toggle="formatblock" data-type="h4"><h4>Heading 4</h4></a>
      <a class="editInlineButton" data-toggle="formatblock" data-type="h5"><h5>Heading 5</h5></a>
      <a class="editInlineButton" data-toggle="formatblock" data-type="h6"><h6>Heading 6</h6></a>
    </div>
  </div>
  <div class="dropdown">
    <button class="editInlineDropdown editLine" data-target="#tagsDropdown" title="Other tags">Tags <span class="caret"></span></button>
    <div id="tagsDropdown" class="dropdown-content hide">
      <a class="editInlineButton" data-toggle="formatblock" data-type="p">Paragraph</a>
      <a class="editInlineButton" data-toggle="formatblock" data-type="span">Span</a>
      <a class="editInlineButton" data-toggle="customclass" data-input="What class would you like to add">Add class</a>
      <a class="editInlineButton" data-toggle="removeclass" data-input="What class would you like to remove">Remove class</a>
    </div>
  </div>
  <button class="editInlineButton" data-toggle="toggleHTML">View HTML</button>
  <button class="editInlineButton" data-toggle="save" style="position:absolute;right:10px">Save</button>
</div>
`

var overlay = $('#editInlineOverlay')
if (overlay.length) overlay.show()
else {
  var elt = document.createElement('script')
  elt.innerHTML = "$('#ContentArea').html(window.ReactRootProps.pageData.html)"
  document.head.appendChild(elt)
  document.body.innerHTML += editInlineOverlay
}

$('#editInlineOverlay .editInlineDropdown').mousedown(function (e) {
  e.preventDefault()
  e.stopPropagation()
  var item = $(this).data('target')
  $('#editInlineOverlay .dropdown-content').not($(item)).addClass('hide')
  if ($(item).hasClass('hide')) $(item).removeClass('hide')
  else $(item).addClass('hide')
  return false
})

$('#editInlineOverlay .editInlineButton').mousedown(function (e) {
  e.preventDefault()
  e.stopPropagation()
  $('#editInlineOverlay .dropdown-content').addClass('hide')
  var type = $(this).data('toggle')
  var input = $(this).data('type')
  var needsInput = $(this).data('input')
  if (needsInput) input = prompt(needsInput)
  if (type === 'save') console.log($('#ContentArea').html())
  if (type === 'toggleHTML') {
    if ($(this).text() === 'View HTML') {
      $(this).text('View Page')
      $('#ContentArea').html('<textarea class="editInlineTextarea">' + $('#ContentArea').html() + '</textarea>')
      return false
    }
    $(this).text('View HTML')
    $('#ContentArea').html($('#ContentArea > textarea').val())
  } else if (type === 'customclass' && input !== null && input) {
    $(window.getSelection().baseNode).parent().addClass(input)
  } else if (type === 'removeclass' && input !== null && input) {
    $(window.getSelection().baseNode).parent().removeClass(input)
  } else if (input !== null && input) document.execCommand(type, false, input)
  else document.execCommand(type)
  addOptions(type)
  return false
})

function addOptions (type) {
  if (type === 'insertunorderedlist') $(window.getSelection().baseNode).parent('ul').addClass('list-unstyled')
}
