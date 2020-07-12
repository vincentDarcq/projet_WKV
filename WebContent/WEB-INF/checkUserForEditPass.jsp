<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vérification identité</title>
</head>
<body>
	<div class="container mt-5 card">
		<div class="card-body">		
		    <form method="post" action="account?checkQuestion=yes&pseudo=${ sessionScope.pseudonyme }">  
		        <div class="form-group">
		            <c:out value="${ user.question }"></c:out> 
		        </div>  
		        <div class="form-group">
		            <label for="reponse">Réponse : </label>
		            <input type="password" name="reponse" id="reponse" class="form-control"/>
		        </div>  
		        <c:if test="${ !empty badReponse }">
		        	<p style="color: red;">La réponse donnée n'est pas bonne</p>
		        </c:if>    
		        <button class="btn btn-success">Vérifier</button>
		    </form>
		    <a href="main"><button class="btn btn-primary">Retour à la page principale</button></a>
		 </div>
	 </div>
</body>
</html>