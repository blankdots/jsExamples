<?php
	session_start();
	if (isset($_SESSION)) {
		echo $_SESSION['name'];
	}
?>