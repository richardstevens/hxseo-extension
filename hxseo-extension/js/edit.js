var editing = 0
if (!document.body.contentEditable === 'false' || document.designMode === 'off') {
  document.body.contentEditable = 'true'
  document.designMode = 'on'
  editing = 1
} else if (document.body.contentEditable === 'true' || document.designMode === 'on') {
  document.body.contentEditable = 'false'
  document.designMode = 'off'
}

editing
