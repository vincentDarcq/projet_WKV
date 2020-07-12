<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>V�rification identit�</title>
</head>
<body>
	<div class="container mt-5 card">
		<div class="card-body">		
		    <form method="post" action="account?checkQuestion=yes&pseudo=${ sessionScope.pseudonyme }">  
		        <div class="form-group">
		            <c:out value="${ user.question }"></c:out> 
		        </div>  
		        <div class="form-group">
		            <label for="reponse">R�ponse : </label>
		            <input type="password" name="reponse" id="reponse" class="form-control"/>
		        </div>  
		        <c:if test="${ !empty badReponse }">
		        	<p style="color: red;">La r�ponse donn�e n'est pas bonne</p>
		        </c:if>    
		        <button class="btn btn-success">V�rifier</button>
		    </form>
		    <a href="main"><button class="btn btn-primary">Retour � la page principale</button></a>
		 </div>
	 </div>
</body>
</html>