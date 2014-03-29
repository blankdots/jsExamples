<?php
	session_start();
	if (isset($_POST)) {
		header("Location: response.php");
		$_SESSION['name'] = $_POST['firstname'] . ' ' .$_POST['lastname'];
		exit();
	}
?>