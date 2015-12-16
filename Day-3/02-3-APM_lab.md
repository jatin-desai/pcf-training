# Monitoring with APM tools

## Goal

To understand the APM monitoring options and enable APM monitoring

## Exercise

* Review the Java buildpack documentation on:
	* [AppDynamics](https://github.com/cloudfoundry/java-buildpack/blob/master/docs/framework-app_dynamics_agent.md).
	* [New Relic](https://github.com/cloudfoundry/java-buildpack/blob/master/docs/framework-new_relic_agent.md#configuration)
	* [Spring Insight](https://github.com/cloudfoundry/java-buildpack/blob/master/docs/framework-spring_insight.md)

* Sign up for a free [AppDynamics](http://appdynamics.com) account

* Create a user provided service instance and bind it to an app you have deployed: [Reference](link:http://www.appdynamics.com/blog/java/monitoring-apps-on-the-cloud-foundry-paas/)

```
cf cups app-dynamics -p host-name,port,ssl-enabled,account-name,account-access-key
```

* Enter the requested info. This is displayed under the `Account Info` section on your App Dynamics account page.

* *For the `ssl-enabled` parameter, be sure to enter `true`.*

* Bind the new instance to your microservice and restart.

* Launch the AppDynamics console and execute curl requests against your microservice.


## Checking your work

* Your App Dynamics service should show correctly under the VCAP_SERVICES environment variable.

```
cf env <first-inital><last-initial>-cities-service
```

* Your space security group (not running group) should contain a rule allowing access to the App Dynamics endpoints.

```
cf security-group <first-initial><last-initial>-space-security-group
```
