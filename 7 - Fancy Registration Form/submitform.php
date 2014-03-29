<?php
	if (!isset($_POST))                // if user id is blank
    	echo "you must not leave it blank"; 
  	else                              // if user id anything else
    	foreach ($_POST as $key => $value) {
    		if(empty($value)) 
    			$value = "empty";
    		else
    			$value;
    		echo "<ul>";
    		echo '<li>' . $key . ' ' . $value . '</li>';
    		echo "</ul>";
    	}
?>