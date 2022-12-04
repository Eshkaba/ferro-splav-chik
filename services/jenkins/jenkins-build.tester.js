'use strict'

const Joi = require('@hapi/joi')
const { isBuildStatus } = require('../build-status')
const t = (module.exports = require('../tester').createServiceTester())

const isJenkinsBuildStatus = Joi.alternatives(
  isBuildStatus,
  Joi.string().allow('unstable')
)

t.create('build job not found')
  .get('/build.json?jobUrl=https://ci.eclipse.org/jgit/job/does-not-exist')
  .expectBadge({ label: 'build', message: 'instance or job not found' })

t.create('build found (view)')
  .get(
    `/build.json?jobUrl=${encodeURIComponent(
      'https://wso2.org/jenkins/view/All Builds/job/archetypes'
    )}`
  )
  .expectBadge({ label: 'build', message: isJenkinsBuildStatus })

t.create('build found (job)')
  .get('/build.json?jobUrl=https://ci.eclipse.org/jgit/job/jgit')
  .expectBadge({ label: 'build', message: isJenkinsBuildStatus })