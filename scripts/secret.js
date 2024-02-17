document.getElementById('yesBtn').addEventListener('click', function() {
    document.getElementById('valentinePrompt').style.display = 'none';
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '<p>Yay!!! See you on Feb 14th</p><img src="https://i.pinimg.com/originals/50/85/26/508526db68210f54e035517c1f3d6dd3.gif" alt="Celebratory Image">';
    responseDiv.style.display = 'block';
  });
  
  document.getElementById('noBtn').addEventListener('mouseover', function() {
    this.style.position = 'absolute';
    this.style.top = Math.random() * window.innerHeight + 'px';
    this.style.left = Math.random() * window.innerWidth + 'px';
  });
  