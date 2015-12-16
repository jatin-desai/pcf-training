# Application Log Draining

In this section, you will configure application log draining into a log analysis tool.  We will use the free Papertrail tool, but any tool that supports tcp syslog draining can be used.

## How it Works

* Review the log draining documentation [here](http://docs.pivotal.io/pivotalcf/devguide/services/log-management.html).

## Papertrail

* Sign up for a free [Papertrail account](https://papertrailapp.com/).

* Follow the instructions to [set up Papertrail](http://docs.run.pivotal.io/devguide/services/log-management-thirdparty-svc.html#papertrail).

* Be sure to add your new User Provided Service to your microservice manifest.

* After you have bound and restarted your microservice, perform a few curl requests and ensure logs are draining into Papertrail.

### Evaluation

* Review the details on [log formats](http://docs.pivotal.io/pivotalcf/devguide/deploy-apps/streaming-logs.html#format)

* How do you see only logs related to application staging?

* How can you view logs for a specific application instance?

* Why didn't you have to add an application security group rule?

* How would you prevent log draining to an external service?

Note:  The questions above are not included on the quiz.  But try to answer/discuss them anyway...  :)


## Other External Tools

Any tcp syslog compliant log tools can be used with CloudFoundry.  A few popular configurations are:

* Log Insight
* Splunk Enterprise
* Logstash w/ Elastic Search & Kibana
* [More](http://docs.run.pivotal.io/devguide/services/log-management-thirdparty-svc.html).
