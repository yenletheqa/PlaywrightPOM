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
                    npx playwright test --grep "Book search" --project=${params.PLAYWRIGHT_PROJECT}
                """
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
