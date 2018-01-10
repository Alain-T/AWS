

var app = angular.module('my_aws_app', ['credential_module', 'rekognition_module', 'image_module']);

/*
 * Credential Module
 */
var credential_module = angular.module('credential_module', []);
credential_module.controller('credentials_controller', ['$scope', 'RekognitionEnv', function ($scope, RekognitionEnv) {
	
	// update configuration
    $scope.update_config = function() {
		console.log('update_config');
		RekognitionEnv.clearRekognition();
		AWS.config.update({accessKeyId: $scope.key_id, secretAccessKey: $scope.secret_key, region: 'eu-west-1'});
    };
	
	// clear configuration
    $scope.clear = function() {
        $scope.key_id = '';
        $scope.secret_key = '';
    };
	$scope.clear();
}]);

/*
 * Rekognition Module
 */
var rekognition_module = angular.module('rekognition_module', []);

rekognition_module.factory('RekognitionEnv', function(){
    var rekognition = undefined;
    return { 
		collection: '',
		getRekognition : function () {
			// console.log('getRekognition');
			
			if(rekognition === undefined){
				console.log('create Rekognition');
				rekognition = new AWS.Rekognition();
			}
			return rekognition;			
		},
		clearRekognition : function () {
			rekognition = undefined;
		}
	};
});

rekognition_module.controller('collections_controller', ['$scope', 'RekognitionEnv', function ($scope, RekognitionEnv) {
	console.log("collections_controller initialization");

	$scope.listCollections_Answer = ''

	$scope.RekognitionEnv = RekognitionEnv;
	$scope.RekognitionEnv.collection = '';

	$scope.clear_listCollections_Answer = function () {
		$scope.listCollections_Answer = ''
	}

	//
	// listCollections
	//
	$scope.listCollections_UI = function () {
		console.log('listCollections_UI');
		
		var params = {
		};

		$scope.listCollections(params).then(function(data) {
			if (data instanceof Error) {
				$scope.listCollections_Answer = data
			}
			else {
				$scope.listCollections_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
	};

	$scope.listCollections = function (params) {
		console.log('listCollections');
		
		var rekognition = RekognitionEnv.getRekognition()
		
		// rekognition.listCollections(params, function(err, data) {
		//  if (err) console.log(err, err.stack); // an error occurred
		//  else     console.log(data);           // successful response
		// });		
		
		var listCollectionsPromise = rekognition.listCollections(params).promise();
		return listCollectionsPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
	};
	
	$scope.clear_Collection_Answer = function () {
		$scope.Collection_Answer = ''
	}

	//
	// createCollection
	//
	$scope.createCollection_UI = function () {
		console.log('createCollection_UI');
		
		var params = {
		  CollectionId: $scope.RekognitionEnv.collection
		};
		
		$scope.createCollection(params).then(function(data) {
			if (data instanceof Error) {
				$scope.Collection_Answer = data
			}
			else {
				$scope.Collection_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
	};

	$scope.createCollection = function (params) {
		console.log('createCollection(', params, ')');
		
		var rekognition = RekognitionEnv.getRekognition()		

		var createCollectionPromise = rekognition.createCollection(params).promise();
		return createCollectionPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
	};

	//
	// deleteCollection
	//
	$scope.deleteCollection_UI = function () {
		console.log('deleteCollection_UI');
		
		var params = {
		  CollectionId: $scope.RekognitionEnv.collection
		};
		
		$scope.deleteCollection(params).then(function(data) {
			if (data instanceof Error) {
				$scope.Collection_Answer = data
			}
			else {
				$scope.Collection_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
	};

	$scope.deleteCollection = function (params) {
		console.log('deleteCollection(', params, ')');
		
		var rekognition = RekognitionEnv.getRekognition()		
		
		var deleteCollectionPromise = rekognition.deleteCollection(params).promise();
		return deleteCollectionPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
	};
}]);

rekognition_module.controller('FacesManagement_controller', ['$scope', 'RekognitionEnv', function ($scope, RekognitionEnv) {
	$scope.RekognitionEnv = RekognitionEnv;
	$scope.faceId = ''

	$scope.clear_listFaces_Answer = function () {
		$scope.listFaces_Answer = ''
	}

	//
	// listFaces
	//
    $scope.listFaces_UI = function() {
		console.log('listFaces_UI');

		var params = {
		  CollectionId: RekognitionEnv.collection
		};
		
		$scope.listFaces(params).then(function(data) {
			if (data instanceof Error) {
				$scope.listFaces_Answer = data
			}
			else {
				$scope.listFaces_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
    };

    $scope.listFaces = function(params) {
		console.log('listFaces');

		var rekognition = RekognitionEnv.getRekognition()		

		var listFacesPromise = rekognition.listFaces(params).promise();
		return listFacesPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
    };	

	$scope.clear_deleteFaces_Answer = function () {
		$scope.deleteFaces_Answer = ''
	}	
	
	//
	// deleteFaces
	//
    $scope.deleteFaces_UI = function() {
		console.log('deleteFaces_UI');
		var params = {
		  CollectionId: RekognitionEnv.collection,
		  FaceIds: [ $scope.faceId ]
		};
		
		$scope.deleteFaces(params).then(function(data) {
			if (data instanceof Error) {
				$scope.deleteFaces_Answer = data
			}
			else {
				$scope.deleteFaces_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
    };

    $scope.deleteFaces = function(params) {
		console.log('deleteFaces');

		var rekognition = RekognitionEnv.getRekognition()		

		var deleteFacesPromise = rekognition.deleteFaces(params).promise();
		return deleteFacesPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
    };		
}]);

rekognition_module.controller('searchFacesByImage_controller', ['$scope', 'RekognitionEnv', 'imageService', function ($scope, RekognitionEnv, imageService) {
	$scope.RekognitionEnv = RekognitionEnv;
	$scope.maxFaces = 99;
	$scope.faceMatchThreshold = 70
	
	$scope.clear_searchFacesByImage_Answer = function () {
		$scope.searchFacesByImage_Answer = ''
	}	
	
	//
	// searchFacesByImage
	//		
    $scope.searchFacesByImage_UI = function() {
		console.log('searchFacesByImage_UI');
		console.log(imageService.imageUrl);

		var params = {
			CollectionId: RekognitionEnv.collection,
			Image: {
				Bytes : imageService.data
			},
			MaxFaces: $scope.maxFaces,
			FaceMatchThreshold: $scope.faceMatchThreshold
		};
		
		$scope.searchFacesByImage(params).then(function(data) {
			if (data instanceof Error) {
				$scope.searchFacesByImage_Answer = data
			}
			else {
				$scope.searchFacesByImage_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
    };

    $scope.searchFacesByImage = function(params) {
		console.log('searchFacesByImage');

		var rekognition = RekognitionEnv.getRekognition()		

		var searchFacesByImagePromise = rekognition.searchFacesByImage(params).promise();
		return searchFacesByImagePromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
    };	
}]);

rekognition_module.controller('indexFaces_controller', ['$scope', 'RekognitionEnv', 'imageService', function ($scope, RekognitionEnv, imageService) {
	$scope.RekognitionEnv = RekognitionEnv;

	$scope.clear_indexFaces_Answer = function () {
		$scope.indexFaces_Answer = ''
	}	
	
	//
	// indexFaces
	//		
    $scope.indexFaces_UI = function() {
		console.log('indexFaces');

		var params = {
			CollectionId: RekognitionEnv.collection,
			Image: {
				Bytes : imageService.data
			},
			DetectionAttributes: [ "DEFAULT" ],
			ExternalImageId: imageService.imageId // must match [a-zA-Z0-9_.\-:]+
		};

		console.log(params);
		
		$scope.indexFaces(params).then(function(data) {
			if (data instanceof Error) {
				$scope.indexFaces_Answer = data
			}
			else {
				$scope.indexFaces_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
    };

    $scope.indexFaces = function(params) {
		console.log('indexFaces');

		var rekognition = RekognitionEnv.getRekognition()		

		var indexFacesPromise = rekognition.indexFaces(params).promise();
		return indexFacesPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
    };	
}]);

rekognition_module.controller('detectFaces_controller', ['$scope', 'RekognitionEnv', 'imageService', function ($scope, RekognitionEnv, imageService) {
	$scope.RekognitionEnv = RekognitionEnv;

	$scope.clear_detectFaces_Answer = function () {
		$scope.detectFaces_Answer = ''
	}	
	
	//
	// detectFaces
	//	
    $scope.detectFaces_UI = function() {
		console.log('detectFaces_UI');
		console.log(imageService.imageUrl);

		var params = {
			Image: {
				Bytes : imageService.data
			},
			Attributes: [ "DEFAULT" ]
		};
		
		$scope.detectFaces(params).then(function(data) {
			if (data instanceof Error) {
				$scope.detectFaces_Answer = data
			}
			else {
				$scope.detectFaces_Answer = JSON.stringify(data, undefined, 2)
			}
			$scope.$apply();
		});	
    };

    $scope.detectFaces = function(params) {
		console.log('detectFaces');

		var rekognition = RekognitionEnv.getRekognition()		

		var detectFacesPromise = rekognition.detectFaces(params).promise();
		return detectFacesPromise.then(function(data) {
			// console.log(data);
			return data;
		}).catch(function(err) {
			// console.log(err, err.stack);
			return err;
		});
    };	
}]);

/*
 * Rekognition Module
 */
imageUrl='https://images-na.ssl-images-amazon.com/images/M/MV5BMjMzNzI1NDgxNF5BMl5BanBnXkFtZTgwMzA1NjM3OTE@._V1_.jpg'
var image_module = angular.module('image_module', []);
image_module.controller('image_controller', ['$scope', '$http', 'imageService', function ($scope, $http, imageService) {
    $scope.imageUrl = '';
    $scope.img = '';


	$scope.items_array = [
		[
			{ "id": "James-Kirk-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjc1NDQ4NjQyNl5BMl5BanBnXkFtZTgwNjIwNzU2MjE@._V1_.jpg" },
			{ "id": "James-Kirk-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyNjc5ODgwODVeQTJeQWpwZ15BbWU4MDI3MTQxNTUx._V1_.jpg" },
			{ "id": "James-Kirk-03", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE4MTI2NjgyN15BMl5BanBnXkFtZTgwMjcwODY0NTE@._V1_.jpg" },
			{ "id": "James-Kirk-04", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMwNTAzNjY1Nl5BMl5BanBnXkFtZTgwNTcyOTYxMzE@._V1_SY1000_CR0,0,1598,1000_AL_.jpg" },
			{ "id": "James-Kirk-05", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgwNjc4NDAyNl5BMl5BanBnXkFtZTgwNzM5NjU2MjE@._V1_.jpg" },
			{ "id": "James-Kirk-06", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2NTE0MTAxNV5BMl5BanBnXkFtZTgwMjM5NjU2MjE@._V1_.jpg" },
			{ "id": "James-Kirk-07", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIwNTE5ODQ2MF5BMl5BanBnXkFtZTgwMzIzMTA1MDE@._V1_SY1000_CR0,0,799,1000_AL_.jpg" },
			{ "id": "James-Kirk-08", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ5MzEzMzcxMl5BMl5BanBnXkFtZTgwODAzMTA1MDE@._V1_SY1000_CR0,0,799,1000_AL_.jpg" },
		],
		[
			{ "id": "Spock-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQxNjgzOTY2M15BMl5BanBnXkFtZTgwMDM1ODM0MDE@._V1_SY1000_CR0,0,1329,1000_AL_.jpg" },
			{ "id": "Spock-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE4MjgzNzUzMV5BMl5BanBnXkFtZTgwOTIwNzU2MjE@._V1_.jpg" },
			{ "id": "Spock-03", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTEwMjk2NDg5NjleQTJeQWpwZ15BbWU4MDM2OTY1NjIx._V1_.jpg" },
			{ "id": "Spock-04", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MzcxNTM5Ml5BMl5BanBnXkFtZTgwMzMxMjU3MTE@._V1_SY1000_CR0,0,1351,1000_AL_.jpg" },
			{ "id": "Spock-05", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDE5OTExNDkzMF5BMl5BanBnXkFtZTgwMjIzMTA1MDE@._V1_SY1000_CR0,0,799,1000_AL_.jpg" },
			{ "id": "Spock-06", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ0NjI2NTkyM15BMl5BanBnXkFtZTgwNzQ1MTE1MDE@._V1_SY1000_CR0,0,1329,1000_AL_.jpg" },
		],
		[
			{ "id": "Mc-Coy-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwMjk1OTg1NV5BMl5BanBnXkFtZTgwMTIzMTA1MDE@._V1_SY1000_CR0,0,799,1000_AL_.jpg" },
			{ "id": "Mc-Coy-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc1NDc1NzUwM15BMl5BanBnXkFtZTgwNzU1ODM0MDE@._V1_SY1000_CR0,0,1329,1000_AL_.jpg" },
			{ "id": "Mc-Coy-03", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQyNjgzNjE2OV5BMl5BanBnXkFtZTgwNTQ1ODM0MDE@._V1_SX1324_CR0,0,1324,999_AL_.jpg" },
			{ "id": "Mc-Coy-04", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM5Nzc2Njk3MF5BMl5BanBnXkFtZTgwNDU1ODM0MDE@._V1_SX1324_CR0,0,1324,999_AL_.jpg" },
			{ "id": "Mc-Coy-05", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BYzc4Mzk5YjQtMDBlYi00MjkyLTkzYzktODRmMzkzNjA2ZmRiXkEyXkFqcGdeQXVyMjQ3MjU3NTU@._V1_.jpg" },
		],
		[
			{ "id": "Scott-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BNmUwZjQwMDEtYjY0OC00NTljLWIyYzYtMWY0ZTIyM2EzZjllXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Scott-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BNTIxMWEzYjEtNWY5YS00MThiLWI0Y2ItYmY0N2Y4MmU0NWRhXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Scott-03", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BZjQ0ZThjZmYtNjQ1My00ODk4LWIxZGYtZDI2NjJjNjg5ZTEwXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Scott-04", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BZDEwODk1ZTEtMGEyZC00NWYzLWIzNGEtY2Y5NTU2NTEyM2I1XkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
		],
		[
			{ "id": "Uhura-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BYTNhMTM4NDAtYjE3NS00MDcyLWFjOGUtM2I5ZWZiMGJmNjBhXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Uhura-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BYWFhZTA0OWMtYWZhMi00MjlmLWJhZGItZWUwMmM2OWE0ZmUwXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Uhura-03", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BZWYyMmIxMGYtODVhNC00ZDQ0LWFhMWUtYjdkYzQwNTY0NDQxXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Uhura-04", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ0Mzg5ODkyNV5BMl5BanBnXkFtZTgwOTcyOTYxMzE@._V1_SY1000_CR0,0,1331,1000_AL_.jpg" },
		],
		[
			{ "id": "James-Kirk_Others", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg3NjMxOTY3OV5BMl5BanBnXkFtZTgwNTY5NjU2MjE@._V1_.jpg" },
			{ "id": "James-Kirk_Spock-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BOTkyOTM1Nzk0OF5BMl5BanBnXkFtZTgwMzkzMTE1NTE@._V1_.jpg" },
			{ "id": "James-Kirk_Spock-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwOTE5MDk0MF5BMl5BanBnXkFtZTgwOTYxNDE1NTE@._V1_.jpg" },
			{ "id": "James-Kirk_Spock-03", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY0NjM1ODAyNl5BMl5BanBnXkFtZTgwMjg5NjU2MjE@._V1_.jpg" },
			{ "id": "James-Kirk_Mc-Coy", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2ODEyMDQ1N15BMl5BanBnXkFtZTgwODYxNDE1NTE@._V1_.jpg" },
			{ "id": "James-Kirk_Others", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BODA2MDY0NzY3OV5BMl5BanBnXkFtZTgwNzcxNDE1NTE@._V1_.jpg" },
			{ "id": "James-Kirk_Spock_Mc-Coy", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjI5MTY2MDQ0Nl5BMl5BanBnXkFtZTgwNDMwNzU2MjE@._V1_.jpg" },
		],
		[
			{ "id": "Spock_Mc-Coy-01", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BNTUwNDc4NjM0MV5BMl5BanBnXkFtZTgwMzM1MTE1MDE@._V1_SY1000_CR0,0,1329,1000_AL_.jpg" },
			{ "id": "Spock_Mc-Coy-02", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQzMjMzMDc4NV5BMl5BanBnXkFtZTgwNDg0MTE1MDE@._V1_SY1000_CR0,0,1329,1000_AL_.jpg" },
			{ "id": "Spock_Scotty", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxOTg0OTkxOF5BMl5BanBnXkFtZTgwNzM1MTE1MDE@._V1_SY1000_CR0,0,1329,1000_AL_.jpg" },
			{ "id": "Spock_Other", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQwOTM1ODM3M15BMl5BanBnXkFtZTgwNTIzMTA1MDE@._V1_SY1000_CR0,0,784,1000_AL_.jpg" },
			{ "id": "Spock_Others", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ3Njc4NzMzNF5BMl5BanBnXkFtZTgwOTg5NjU2MjE@._V1_.jpg" },
		],
		[
			{ "id": "Scott_Uhura", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BZDI1MDhjOTUtNTEyYS00OTJmLTg4ZmUtNzc4ZGFhYzMwZGJhXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
			{ "id": "Scott_Mc-Coy", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTliODBjYWUtYTZkMC00ODUwLThiMzItODhhYTg0MmUyM2MzXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
		],
		[
			{ "id": "Uhura_James-Kirk", "url": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDA0MjA0NjItMzk0My00ODY1LTk3NDYtYWU3NWYyZDJiMTVmXkEyXkFqcGdeQXVyMzQ2MDUxMTg@._V1_.jpg" },
		],
	];
	
	$scope.myIndex = 0
	$scope.myValue = 0
    $scope.setImage = function(index, value) {
		$scope.myIndex = index;
		$scope.myValue = value;
		$scope.imageUrl = $scope.items_array[index][value].url;
		$scope.imageId  = $scope.items_array[index][value].id;
    }
	
	/*
	$scope.$watch('myValue', function() {
		console.log($scope.myValue)
		$scope.imageUrl = $scope.items[$scope.myValue].url;
		$scope.imageId = $scope.items[$scope.myValue].id;
	});
    */
	
    $scope.getCtrlScope = function() {
         return $scope;   
    }
	
    $scope.loadImage = function() {
		console.log("loadImage")
	  $http({
		method: 'GET',
		url: $scope.imageUrl,
		responseType: 'arraybuffer'
	  }).then(function(response) {
		// console.log(response);
		var str = _arrayBufferToBase64(response.data);
		// console.log(str);
		// str is base64 encoded.
		$scope.img = str;

		imageService.imageUrl = $scope.imageUrl;
		imageService.imageId = $scope.imageId;
		imageService.data = response.data;
		imageService.img = str;
		
		// $scope.$apply();
		
	  }, function(response) {
		console.error('error in getting static img.');
	  });
    };	
}]);

image_module.service("imageService", [function () {
    this.imageUrl = '';
    this.imageId = '';
    this.name = '';
    this.data = '';
    this.img = '';
}]);

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
