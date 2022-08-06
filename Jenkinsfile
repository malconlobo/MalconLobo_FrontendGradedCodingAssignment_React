pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo ~/.nvm/versions/node/v16.16.0/bin/npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/jenkins-react-app"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/jenkins-react-app/"
            }
        }
    }
}
