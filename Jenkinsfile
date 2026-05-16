pipeline {
    agent any

    environment {
        IMAGE_NAME = "rturox-web"
        CONTAINER_NAME = "rturox-container"
        PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Remove Old Image') {
            steps {
                sh '''
                docker rmi $IMAGE_NAME || true
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                -p $PORT:$PORT \
                --restart always \
                $IMAGE_NAME
                '''
            }
        }

        stage('Verify Running Container') {
            steps {
                sh '''
                docker ps
                '''
            }
        }
    }

    post {

        success {
            echo '✅ Deployment Successful!'
        }

        failure {
            echo '❌ Deployment Failed!'
        }

        always {
            sh 'docker images'
        }
    }
}