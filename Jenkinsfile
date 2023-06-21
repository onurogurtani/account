@Library('DevOpsGenericLibrary') _

pipeline {

    agent { label 'tocpt2-dotnet6' }
    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '30'))
        disableConcurrentBuilds()
    }

	environment {

		// App Variables
        mainBranch = "devops"
        appServiceName = "dijital_dershane_app"
        softwareModuleName = "account"
        subsoftwareModuleName = "accountapi"
        serviceId = "471949"

        appVersion = "${mainBranch}-${env.BUILD_NUMBER}"

        artifactoryHostAddress = "artifactory.turkcell.com.tr"

        // docker/openshift variables
        // docker registry repo name on artifacatory
        dockerRepo = "local-docker-dist-dev"
        dockerRegistryBaseUrl = "${artifactoryHostAddress}/${dockerRepo}/com/turkcell"
        // newly created docker image address
        newImageUrl = ""
        // openshift namespace to be used in this script
        openshiftProjectName = "learnup"
        // openshift credential name in Jenkins
        openshiftClientToken = "tocpt4-learnup-token"
        // push secret name for docker registry on artifactory
        imagePushSecret = "artifactory-ccs"
        // pull secret name for docker registry on artifactory
        imagePullSecret = "artifactory-ccs"
        // openshift build config git credential secret name
        gitCredentialSecret = "jenkins-git"
        // openshift build config template yaml file
        buildConfigTemplate = "openshift/build/buildconfig-template.yaml"			// openshift build config template yaml file
        deploymentConfigTemplate = "openshift/deploy/deployment.yaml"

        defaultMailReceivers = ""
        successMailReceivers = "${defaultMailReceivers}"
        failureMailReceivers = "${defaultMailReceivers}"

        artifactoryDeployInfo = " "
        artifactDeployVersion = " "
        artifactoryPathFileJar = " "
        sonarPluginVersion = "3.7.0.1746"
        sonarProjectKey = "${serviceId}_${appServiceName.toUpperCase()}.${softwareModuleName}.${subsoftwareModuleName}"
        fortifyProjectKey = "${serviceId}_${appServiceName.toUpperCase()}.${softwareModuleName}-${subsoftwareModuleName}"
		SONARQUBE_URL = "https://sonar-ccs.turkcell.com.tr/"
		SONAR_URL = 'https://sonar-ccs.turkcell.com.tr/'
		SONAR_LOGIN_KEY = ''
	}


    stages {
        // stage('Build') {

        //     steps{
        //         script {
        //             printSectionBoundry ("Build stage starting...")
        //             sh "dotnet restore"
        //             sh "dotnet build"

        //             printSectionBoundry("Build stage finished!")
        //         }
        //     }
        // }
		// stage('Sonar - Code Quality') {
        //     when {
        //         anyOf {
        //             branch "stb"
        //         }
        //     }
        //     steps {
        //         script {
        //             printSectionBoundry ("Code Quality/Static Code Analysis stage starting...")

        //             withSonarQubeEnv("SONARQUBE_URL") {
                        
        //             }

        //             printSectionBoundry("Code Quality/Static Code Analysis stage finished!")
        //         }
        //     }
        // }

        // stage('Fortify-Code Security'){

        // when { expression { "${env.BRANCH_NAME}" == "stb" } }
        //     steps {
        //         script {
        //             sh "echo static application security testing SAST - Fortify"
        //             fortifyScanner = tool 'fortify-scanner'
        //             fortifyRemoteAnalysis remoteAnalysisProjectType: fortifyMaven(),
        //             uploadSSC: [appName: "${fortifyProjectKey}", appVersion: "stb"]
        //         }
        //     }
        // }
        // stage('Publish Artifact') {
        //     steps{
        //         script {

        //         }
        //     }
        // }
        stage ('Continuous Integration'){

            parallel {
                stage('Openshift Build') {
                    stages  {
                        stage('Configuration') {
                            when {
                                anyOf {
                                    expression {  "${env.BRANCH_NAME}" == "${mainBranch}"    }
                                }
                            }
                            steps {
                                script {
                                    printDebugMessage ("Openshift Project: ${openshiftProjectName}")

                                    newImageUrl = "${dockerRegistryBaseUrl}/${appServiceName}/${softwareModuleName}/${subsoftwareModuleName}:${appVersion}"

                                    printDebugMessage ("newImageUrl = " + newImageUrl)
                                    printSectionBoundry("Configuration stage finished!")
                                }
                            }
                        }

                        stage('Build Docker') {
                            when {
                                anyOf {
                                    expression {  "${env.BRANCH_NAME}" == "${mainBranch}"    }
                                }
                            }
                            steps {
                                script {
                                    printSectionBoundry ("Build Docker stage starting...")
                                    printDebugMessage ("newImageUrl2 = " + newImageUrl)

							        openshiftClient {
							        	openshift.apply(
                                        openshift.process(readFile(file: buildConfigTemplate),
                                        "-p", "APP_NAME=${subsoftwareModuleName}",
                                        "-p", "APP_VERSION=${appVersion}",
                                        "-p", "SOURCE_REPOSITORY_URL=${GIT_URL}",
                                        "-p", "BRANCH_NAME=${env.BRANCH_NAME}",
                                        "-p", "PUSH_SECRET=${imagePushSecret}",
                                        "-p", "PULL_SECRET=${imagePullSecret}",
                                        "-p", "REGISTRY_URL=${newImageUrl}",
                                        "-p", "SOURCE_SECRET_NAME=${gitCredentialSecret}",
                                        "-p", "DOCKERFILE_PATH=./Dockerfile"
                                        )
                                        )
							        	openshift.startBuild("${subsoftwareModuleName}", "--wait", "--follow")
							        }

                                    printSectionBoundry("Build Docker stage finished!")
                                }
                            }
                        }
                    }
                }
            }
        }

        stage('Openshift Deployment') {
            steps {
                script {
                    printSectionBoundry ("Deploy stage starting...")
					if (params.jobAction == 'Promotion & Deploy') {

					imageUrlParsing (params.artifactPath)
                	printDebugMessage ( "image`s name: "   + imageName )
                	printDebugMessage ( "image`s tag: "    + imageTag  )
                    newImageUrl= "${imageName}:${imageTag}"

					// below part must be added for local-docker-dist-prod deployment.yaml
      				//imagePullSecrets:
      				//  - name: artifactory-ifts
                    // or oc secrets link default artifactory-ifts --for=pull
					}
                    artifactoryDeployInfo = artifactoryDeployInfo + "<br /><br />An Docker Image with URL below has been used in this build:<br />" + "https://artifactory.turkcell.com.tr/artifactory/" + newImageUrl


                        openshiftClient {
                            openshift.apply(openshift.process(readFile(file: deploymentConfigTemplate), "-p", "REGISTRY_URL=${newImageUrl}", "-p", "APP_NAME=${APP_NAME}","-p", "NAMESPACE=${openshiftProjectName}"))
                            def dc = openshift.selector('dc', "${APP_NAME}")
                            dc.rollout().status()
                        }


                    printSectionBoundry("Deploy stage finished!")
                }
            }
        }
    }

            post{
                success {
                    script {
                        printDebugMessage ("Build success!")
                        if (artifactoryDeployInfo != " ") {
						devopsLibrary.sendEmail(successMailReceivers, softwareModuleName + "#${BUILD_NUMBER} succeeded!", getFormattedIssueList(devopsLibrary.getCommitMessagesFromChangeSet()) + artifactoryDeployInfo)
                        }


                        /* Trex v3 geçişi ile sonrasında Jira entegrasyonu için açılacak.
                        if(env.BRANCH_NAME == "releasable"){
                            print("Releseable build successi Jirada statuyu BUILD TAMAMLANDI'ya güncelliyorum")
                            devopsLibrary.updateJiraStatus("Success", "Moving to BUILD TAMAMLANDI","361")
                        }
                        */
                    }
                }

                failure {
                    script {
                        printDebugMessage ("Build failure!")
						devopsLibrary.sendEmail(failureMailReceivers, softwareModuleName + "#${BUILD_NUMBER} failed!", getFormattedIssueList(devopsLibrary.getCommitMessagesFromChangeSet()) + artifactoryDeployInfo)

                        /* Trex v3 geçişi ile sonrasında Jira entegrasyonu için açılacak.
                        if(env.BRANCH_NAME == "releasable"){
                            print("Releseable build failed Jirada statuyu BUILD FAILED'a güncelliyorum")
                            devopsLibrary.updateJiraStatus("Success", "Back to BUILD FAILED","411")
                        }
                        */
                    }
                }

                unstable {
                    script {
                        printDebugMessage ("Build unstable!")
						devopsLibrary.sendEmail(failureMailReceivers, softwareModuleName + "#${BUILD_NUMBER} is unstable!", getFormattedIssueList(devopsLibrary.getCommitMessagesFromChangeSet()) + artifactoryDeployInfo)

                        /* Trex v3 geçişi ile sonrasında Jira entegrasyonu için açılacak.
                        if(env.BRANCH_NAME == "releasable"){
                            print("Releseable build failed Jirada statuyu BUILD UNSTABLE'a güncelliyorum")
                            devopsLibrary.updateJiraStatus("Success", "Back to BUILD UNSTABLE","411")
                        }
                        */
                    }
                }
    }
}

def imageUrlParsing (artifactPath){

    artifactPath = artifactPath.replace('local-docker-dist-dev','local-docker-dist-prod')
    artifactUrlArray = artifactPath.tokenize('/')
    imageTag = artifactUrlArray [-1]
    artifactUrlArray.remove((artifactUrlArray.size() - 1))
    imageName = artifactoryHostAddress +"/" + artifactUrlArray.join('/')
}

def openshiftClient(Closure body) {
    openshift.withCluster('insecure://api.tocpt4.tcs.turkcell.tgc:6443') {
        openshift.withCredentials(openshiftClientToken) {
            openshift.withProject(openshiftProjectName) {
                body()
            }
        }
    }
}

@NonCPS
def getIssueKeyFromCommitMessage(){

	def issueKeys = []
    def issue_pattern = "[a-z,A-Z]{1,10}-\\d+"

	currentBuild.changeSets.each {changeSet ->
		changeSet.each { commit ->
			String msg = commit.getMsg()
			msg.findAll(issue_pattern).each { idd ->
				issueKeys.add("$idd")
			}
		}
	}

	return issueKeys
}

def getIssueKeyFromParameter(def _issueKey ){

	def issueKeys = []
    def issue_pattern = "[a-z,A-Z]{1,10}-\\d+"
    if( issueKey?.trim() ) {
    //issueKeys = ("$issueKey").split(',') as List

    _issueKey.split(',').each { idd ->
			idd.findAll(issue_pattern).each { it ->
				issueKeys.add("$it")
			}
        }
    }
    return issueKeys
}

def updateJiraStatus(def issueKey, def transitionId) {
  	try {
		  withCredentials([usernameColonPassword(credentialsId: 'jira_user_pass', variable: 'jira_user_pass')]) {
			sh """
				data='{ "transition": { "id": "${transitionId}" } }'

				curl --connect-timeout 10 -D- -u \$jira_user_pass -X POST \
				--data "\$data" \
				-H "Content-Type:application/json" \
				http://10.201.237.141:8080/rest/api/2/issue/${issueKey}/transitions?expand=transitions.fields
			"""
		  }
  	}
   	catch(all) {
  	}
}

def addCommentToIssue(def issueKey, def commentMessage){
	try {
		  withCredentials([usernameColonPassword(credentialsId: 'jira_user_pass', variable: 'jira_user_pass')]) {
			sh """
				data='{ "body": "${commentMessage}" }'

				curl --connect-timeout 10 -D- -u \$jira_user_pass -X POST \
				--data "\$data" \
				-H "Content-Type:application/json" \
				http://10.201.237.141:8080/rest/api/2/issue/${issueKey}/comment
			"""
		  }
  	}
   	catch(all) {
  	}
}

def getFormattedIssueList (def issueList) {
	def formattedMessage = ""

	if (issueList) {
		formattedMessage = "Commit(s) in this build: <br />" + issueList.join("<br />")
	} else {
		formattedMessage = "<em>&lt;There is no commit pushed for this build!&gt;</em>"
	}

	return "<br />" + formattedMessage
}

def printSectionBoundry (def message) {
    println ("**************************************< " + message + " >**************************************")
}

def printDebugMessage (def message) {
    println ("DEBUG: " + message)
}