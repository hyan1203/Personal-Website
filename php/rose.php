<?php
header("Content-type: application/json");
include("../config.php");
session_start();

	if(isset($_REQUEST['case'])){
		switch ($_REQUEST['case']) {
			case 'addscore':
			$rosenum = 1;
			try {
					$DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
					$STH = $DBH->query("SELECT * FROM personalsite");
					$STH->setFetchMode(PDO::FETCH_ASSOC);
					$record = $STH->fetch(); //Should only be one record, username is unique.
					$rosenum = $record['rose']+$rosenum;
					echo $rosenum;
					$DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
					$data = array($rosenum);
					$STH = $DBH->prepare('Update personalsite SET rose=?');
					$STH->execute($data);
					echo "success";
			}
			catch(PDOException $e) {
					echo $e->getMessage();
			}
				break;

			case 'getscore':
				try {
						$DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
						$STH = $DBH->query("SELECT * FROM personalsite");
						$STH->setFetchMode(PDO::FETCH_ASSOC);
						$record = $STH->fetch(); //Should only be one record, username is unique.
						$rosenum = $record['rose'];
						echo $rosenum;
				}
				catch(PDOException $e) {
						echo $e->getMessage();
				}
				break;

			default:
				echo "ERROR: case not recognized";
				break;
		}
	}
	else {
		echo "ERROR: case not set";
	}
