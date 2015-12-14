<!-- .slide: class="center" style="text-align: center" transitionSpeed="slow" data-background="#01786e" -->

## SECURITY IN PIVOTAL CLOUD FOUNDRY

---

# Layers of Security

![](assets/layered-approach.png)<!-- .element: style="width:70%; height: auto; float: center" -->

---

##<!-- .element: class="fa-icon fa fa-lock"--> Pivotal CF Axes of Security

* Confidentiality
  * Access Control
    * Authentication
    * Authorization
    * Auditing
* Integrity
  * Network Security 
    * Cryptography
* Availability

Note:

Need to consider
* Ops Manager & Director -> Bosh
* Elastic Runtime -> Warden & Diego
* Developer Console -> Application
* UAA -> Users & Groups
* Interfaces ->
* Resource Pools ->
* Outer Shell
* Inner Shell
* Security Architecture and Design
  * Container
  * Application
* Operations Security

http://docs.pivotal.io/pivotalcf/concepts/security.html
We are not going to cover
* Security Governance and Risk Management
* Software Development Security
* Roadmap - slide at end
* Software Vulnerability Management - slide at end


for each (C,I,A)
  User
  Outer
  Inner
  App
  Service

---

<!-- .slide: class="center" style="text-align: center" transitionSpeed="slow" data-background="#01786e" -->

# System Boundaries - Identity & Access Control

---

## A Pivotal Cloud Foundry Foundation

![](assets/foundation.png)<!-- .element: style="width: 50%; height: auto; margin-left: auto; margin-right: auto; float: right;margin-top: -2%;" -->

Physical division for completely separate managed environments

Targeted to a specific IaaS infrastructure (e.g. vSphere cluster)

Can be used to physically separate production from pre-production

---

## Organizations

![](assets/orgs.png)<!-- .element: style="width: 40%; height: auto; margin-left: auto; margin-right: auto; float: right;" -->

Logical divisions for tenants, having their own Quotas and Users

User permissions are specified per Org and Space

User administration is delegated to the Org level

Roles: Org Manager, Org Auditor

---

## Spaces

![](assets/spaces.png)<!-- .element: style="width: 30%; height: auto; margin-left: auto; margin-right: auto; float: right;" -->

Logical sub-division inside an Org

Users specified at the Org level can have different access levels per Space

Services and Applications are scoped to a  Space

Roles: Space Managers, Space Developers, Space Auditors

---

## <i class="fa fa-tachometer"></i> Role and Access Management

Built-in dashboard allows IT Operations to segregate access of shared resources with ease and apply org-wide governance models within a Foundation

- Manage OS/Middleware versions
- Manage organization access by environment
- Manage resources access by role: IT Operators, Developers, Testers

---

<!-- .slide: class="center" style="text-align: center" transitionSpeed="slow" data-background="#01786e" -->

# Services

---

## Security Benefits of Managed and User-Provided Services

* Reduce an app’s attack surface
* Keep service credentials confidential
* Improve the consistency of devops procedures
* Enable standardized event monitoring
* Simplified auditing visibility

Note: http://johnpfield.wordpress.com/2014/09/17/some-basic-security-considerations-for-cloud-foundry-services/

---

## Managed Services

![](assets/managed-services-access.png)<!-- .element: style="width:50%; height: auto; float: right" -->

Service Brokers generate connection details and credentials

Credentials are encrypted and stored in the CCDB

Credentials are exposed to bound applications via `VCAP_SERVICES` environment variable

---

## Managed Services Instances

`VCAP_SERVICES` environment variable is visible only to members of the org and space containing the service instance

```
"VCAP_SERVICES": {
  "cleardb": [
  {
    "credentials": {
      "hostname": "us-cdbr-iron-east-01.cleardb.net",
      "jdbcUrl": "jdbc:mysql://b6ff4f848e6edd:ee2021a8@us-cdbr-iron-east-01.cleardb.net:3306/ad_abbdc667362bce4",
      "name": "ad_abbdc667362bce4",
      "password": "ee2021a8",
      "port": "3306",
      "uri": "mysql://b6ff4f848e6edd:ee2021a8@us-cdbr-iron-east-01.cleardb.net:3306/ad_abbdc667362bce4?reconnect=true",
      "username": "b6ff4f848e6edd"
      },
      "label": "cleardb",
      "name": "mysql",
      "plan": "spark",
      "tags": [
      "Data Stores",
      "relational",
      "Data Store",
      "mysql"
      ]
    }
    ]
  }
  ```

---

## Security Considerations for CUPS

- Credentials NOT carried in a properties file within the application war file
- Custody of credentials shifts from the app configuration, to the Cloud Controller DB
- If the user-provided service requires the app to use SSL/TLS for access then app may need to be pushed with a custom Buildpack
- Factor out the certificate management functions from the app configuration

---

## <!-- .element: class="fa-icon fa fa-user"-->User Authentication and Authorization

- Provides Identity & Access Management for Cloud Foundry
- OAuth 2 provider and SCIM capable REST server
- Both an OAuth2 authorization and resource server
- Provides endpoints for managing user accounts and OAuth2 clients
- Supported Standards: OAuth2, OpenID Connect, SCIM, JWT
- Provides authentication for keystone & LDAP

---

## Login Server

- Handles SAML authentication in Cloud Foundry
- Delegates all other identity management tasks to the UAA
- Branded HTML UI for authentication and OAuth approval
- SSO for web applications in the Cloud Foundry platform
- SAML 2.0 Service Provider authenticating against SAML IDPs
- Holds an HTTP session for an authenticated user via the UI
- Integration with a central notifications server for managing emails

---

### Typical Authorization Code Grant Flow

![](assets/UAA-Data-Flow.png)<!-- .element: style="width:65%; height: auto;" -->

---


## UAA + Login Server = End User Identity

<!-- .slide: style="font-size: 30px;" -->

![](assets/uaa-flow.png)<!-- .element: style="width:40%; height: auto; float: right " -->


UAA stores usernames and encrypted passwords in the UAADB

UAA can use either symmetric key encryption (shared secrets) or public key encryption.

All interactions with the CC API must include a valid OAuth2 access token

UAA supports integration with external authentication sources like LDAP and AD

---

<!-- .slide: class="center" style="text-align: center" transitionSpeed="slow" data-background="#01786e" -->

# System Boundaries - Perimeter Integrity

---

##  <!-- .element: class="fa-icon fa fa-lock"-->System Boundaries

  ![](assets/deploy-topology.png)<!-- .element: style="width:80%; height: auto; float: center;margin-top: -3%;" -->

Note:Minimal Pivotal CF network access. Allows PCF to be easily deployed on a VLAN or behind a firewall.Reduces surface area vulnerabilities

---

## <!-- .element: class="fa fa-icon fa-shield"--> Firewalls/IaaS Security Groups

- Managed firewalls prevent IP, MAC & ARP spoofing between VMs
- Firewalls configured to limit inbound & outbound connections
- Rules prevent app inside a Warden container from talking to system components
- Rules configured with ```allow_networks``` & ```deny_networks``` properties in BOSH manifest
- Application isolation, OS restrictions & encrypted connections ensure risk is mitigated

---

##  <!-- .element: class="fa-icon fa fa-lock"-->API Access Protocols

![](assets/api-access.png)<!-- .element: style="width:70%; height: auto; float: right;margin-top: -1%;" -->


API access for app mgnt. service mgmt., org & space mgmt.  is routed to Cloud Controller via HTTP/HTTPS.

Note: . Inside the boundary of the system, components communicate over a pub-sub message bus, gnatsd.

---

## External Load Balancer

![](assets/loadbalancer.png)<!-- .element: style="width:50%; height: auto; float: right" -->

  HA Proxy can be replaced with an external load balancer

  SSL is terminated at the load balancer

Note:
Switching to an external LB requires SSL certs, VIP(s) and Ability to add ``` X-Forwarded-For X-Forwarded-Port X-Forwarded-Protocol``` headers

---

##  <!-- .element: class="fa-icon fa fa-lock"-->Outbound Service Access

![](assets/service-access.png)<!-- .element: style="width:65%; height: auto; float: right" -->

Applications connect directly to managed services via assigned addresses and ports

Applications can access “user provided” services outside of the PCF VLAN

Note: One advantage of using a managed service is that, in general, the credentials that are needed to access that service will not need to be pre-configured into your applications. Rather, these can be dynamically provisioned and injected into the application at runtime.

---

##  <!-- .element: class="fa-icon fa fa-lock"-->Inbound Service Access

![](assets/service-access2.png)<!-- .element: style="width:65%; height: auto; float: right;margin-top: -3%;" -->

  Users can access managed services from outside the PCF VLAN as allowed by firewall rules

  Ports are dependent on the service

  Some services (e.g. RabbitMQ expose dashboard UIs on additional ports

---

<!-- .slide: class="center" style="text-align: center" transitionSpeed="slow" data-background="#01786e" -->

# System Boundaries - Application Container Integrity

---

##  <!-- .element: class="fa-icon fa fa-lock"-->Application Access

<!-- .slide: style="font-size: 30px;" -->

![](assets/app-access.png)<!-- .element: style="width: 65%; height: auto; display: block; margin-left: auto; margin-right: auto; float: right;" -->

Application access is routed directly to an application instance

SSL is terminated at the HA Proxy load balancing layer; all internal PCF traffic is trusted HTTP

App-App and App-System component communication is prevented by firewall rules specified in CF Deployment

Note:The App Container IP address is allocated when the application instance is started. The application is also assigned an arbitrary port. The application can determine which port to listen on from the VCAP_APP_PORT environment variable provided in the container environment.The Elastic Runtime router handles all inbound traffic to applications, routing traffic to one of the application instances.If the deployment is configured as recommended with the cluster on a VLAN, then all outbound traffic goes through two levels of network address translation: container IP address to DEA IP address, then DEA to the NAT provisioned to connect the VLAN with the public internet. Applications are prevented from connecting directly with other applications, or with system components, by the firewall rules specified in the operator-controlled BOSH deployment manifest.

---

##  <!-- .element: class="fa-icon fa fa-exchange"-->Application Traffic

![](assets/app_traffic.png)<!-- .element: style="width: 50%; height: auto; float: right" -->

All outbound traffic goes through two levels of network address translation

Container IP address to DEA IP address

DEA to the NAT provisioned to connect the VLAN with the public internet

---

##  <!-- .element: class="fa-icon fa fa-lock"-->Container Isolation

![](assets/container-isolation1.png)<!-- .element: style="width:30%; height: auto; float: right" -->


Containers provide isolation of resources – CPU, memory, file system, process space, network

Containers have their own private network, not accessible from outside the DEA

Note:Networking Every container is assigned a network interface which is one side of a virtual ethernet pair created on the host. The other side of the virtual ethernet pair is only visible on the host, from the root namespace. The pair is configured to use IPs in a small and static subnet. Traffic from and to the container can be forwarded using NAT. Additionally, all traffic can be filtered and shaped as needed, using readily available tools such as iptables.

Filesystem Every container gets a private root filesystem. This filesystem is created by stacking a read-only filesystem and a read-write filesystem. This is implemented by using aufs on Ubuntu versions from 10.04 up to 11.10, and overlayfs on Ubuntu 12.04.


---

##  <!-- .element: class="fa-icon fa fa-lock"-->Inter-Container Isolation

![](assets/container-isolation2.png)<!-- .element: style="width:50%; height: auto; float: right" -->


Routers forward requests from outside using the app’s route to the assigned port on the DEA, which does network translation to the container’s internal IP and port

Apps are prevented from communicating directly with each other by container firewall rules; they must communicate through published routes

---

<!-- .slide: class="center" style="text-align: center" transitionSpeed="slow" data-background="#01786e" -->

# Application Security Groups

---

### <!-- .element: class="fa-icon fa fa-users"-->Application Security Groups

* Virtual firewalls to control outbound traffic from  apps in your deployment

* List of network egress `allow` rules for application containers

* Can be applied to the entire deployment or to a space

* Evaluates security groups * other traffic rules in a strict priority order
``` json
[{"protocol":"tcp","destination":"10.0.11.0/24","ports":"1-65535"},
  {"protocol":"udp","destination":"10.0.11.0/24","ports":"1-65535"}]
```

Note:
`allow`, `deny`, or `reject` result for the first rule that matches the outbound traffic request parameters, and does not evaluate any lower-priority rules

---

### <!-- .element: class="fa-icon fa fa-users"-->Assigning Security Groups
* System security rules (REJECT all) are hard-coded at the bottom of the chain
* Set of whitelist rules in three targets
  * All running application (“Global Running”)
  * All application in staging mode (“Global Staging”)
  * Specific groups of applications (“Space”)
* Rules are automatically applied at the app-container creation
*  Result in IPTABLES rules applied to the virtual network interface used by application containers


---

### <!-- .element: class="fa-icon fa fa-users"-->SG Rules

![](assets/sec-grp-rules.png)<!-- .element: style="width:70%; height: auto; float: right;margin-top: -8%;" -->

---

### <!-- .element: class="fa-icon fa fa-code-fork"-->Securing Application Code at Rest & Transit

<!-- .slide: style="font-size: 34px;" -->

- Application developers push their code and metadata to blob-store & Cloud Controller

- Access to app bits is secured through OAUTH2 -the UAA and SSL

- Cloud Controller has role based permissions such that only authorized users aka developers are allowed to start/stop/push/delete an app

- Cloud Controller stores application configuration in an encrypted database

- Applications then run inside a secure container utilizing cgroups, user access permissions, and a firewalled network which prevents communication with system components

---

## <!-- .element: class="fa-icon fa fa-road"-->Pivotal CF Security Updates

* Identity as a service tile based on UAA
* Login Server merged with the UAA component
* Login server is now a sub module of the UAA project
* CA SiteMinder certified as a Web Access Management solution for apps
* PCF certified with CA SiteMinder as a SAML 2.0 IDP for Single Sign-On
* SAML Authentication moved to the UAA
* Notifications endpoint

---

## <!-- .element: class="fa-icon fa fa-link"-->For More Information

- [OAuth2 Tutorial](http://tutorials.jenkov.com/oauth2/index.html)
- Root of [source code tree](http://github.com/cloudfoundry/uaa), separate apps are uaa, samples/app, and samples/api.
README.md and docs directory have some good [docs](https://github.com/cloudfoundry/uaa/blob/master/docs/Sysadmin-Guide.rst) (check age, some are out of date)
- [Source](http://github.com/cloudfoundry/login-server) for login-server is in another repository
- [Discussion](https://groups.google.com/a/cloudfoundry.org/forum/#!topic/vcap-dev/73wXTyA3rxw) on vcap-dev of possible merging of login-server into uaa
- [OAuth2 Specification](http://tools.ietf.org/html/rfc6749)
- [Article on securing service with UAA's OAuth2 functionality](http://blog.sequenceiq.com/blog/2014/10/16/using-uaa-as-an-identity-server/)
- [Walkthrough](http://blog.cloudfoundry.org/2012/07/23/introducing-the-uaa-and-security-for-cloud-foundry/) of the UAA sample apps
- Replay of Dave Syer's [Webinar](https://spring.io/blog/2014/11/07/webinar-replay-security-for-microservices-with-spring-and-oauth2) on Security for Microservices with Spring and OAuth2
- [Blog](https://blog.starkandwayne.com/2014/11/11/simple-golang-oauth-client-for-cf/) article detailing UAA app client written in [golang](https://golang.org/)
- Cloud Foundry [UAA - LDAP Integration](https://docs.google.com/a/pivotal.io/document/d/1oko714gd8irLYRvNel7fhsfme3LFXzPRpwY6HUCLT7U/pub)
- [UAA, login-server, and SAML](https://slack-files.com/files-pri-safe/T025QNH4A-F03034UMP/uaa_login_howto.pdf?c=1415899126-9f408e5a852d6d01e4a48edce26ee0d899c10c74)
- [Dashboard SSO](https://github.com/cloudfoundry/docs-services/blob/master/dashboard-sso.html.md)
- [Public & Private Microservices](https://blog.starkandwayne.com/2014/10/31/public-and-private-microservices-on-the-same-cloud-foundry/)
- [User Account and Authentication Service APIs](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst)
