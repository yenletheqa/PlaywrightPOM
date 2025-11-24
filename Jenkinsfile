pipeline {
    agent any

    parameters {
        choice(
            name: 'PLAYWRIGHT_PROJECT',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select the Playwright project to execute'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop',
                url: 'https://github.com/yenletheqa/PlaywrightPOM.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Run Tests') {
            steps {
                sh """
                    yarn playwright test --project=${params.PLAYWRIGHT_PROJECT}
                """
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(
            target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ]
        )
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
