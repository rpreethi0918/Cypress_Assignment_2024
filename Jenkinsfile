pipeline {
    agent any
    tools {
        nodejs "NodeJS" // Ensure NodeJS tool configuration matches the name here
    }
    stages {
        stage('Install Dependencies') {
            steps {
                // Install project dependencies, including Cypress
                sh 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests
                sh 'npx cypress run'
            }
        }
    }
    post {
        always {
            // Archive screenshots and videos
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            // Publish JUnit test results if available
            junit 'cypress/results/*.xml'
        }
    }
}

