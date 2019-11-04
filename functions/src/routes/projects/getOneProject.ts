import { getDb } from "../config/db";
const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const projectsPromise = db.collection('projects').doc(id).get();
    const movementPromise = db.collection('projects').doc(id).collection('movements').orderBy('index').get();

    const movementSnapshot = await movementPromise;
    const projectsSnapshot = await projectsPromise;

    console.log('Project Snapshot: ' + projectsSnapshot);
    console.log('Movement Snapshot: ' + movementSnapshot);

    if (!await projectsSnapshot) {
      throw new Error('Project ' + id + ' not found.')
    }

    let project: any = {};

    project = projectsSnapshot.data();
    project.movements = movementSnapshot.data();
    project.id = projectsSnapshot.id;

    res.status(200).json(project);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

const data = {
  "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
  "authenticationInfo": { "principalEmail": "scott.ma.benton@gmail.com" },
  "requestMetadata": {
    "callerIp": "52.167.161.233",
    "callerSuppliedUserAgent": "FirebaseCLI/7.6.2,gzip(gfe),gzip(gfe)",
    "requestAttributes": { "time": "2019-11-04T05:02:25.710Z", "auth": {} },
    "destinationAttributes": {}
  }, "serviceName": "cloudfunctions.googleapis.com",
  "methodName": "google.cloud.functions.v1.CloudFunctionsService.UpdateFunction",
  "authorizationInfo": [{
    "resource": "projects/field-set-54072/locations/us-central1/functions/api",
    "permission": "cloudfunctions.functions.update", "granted": true, "resourceAttributes": {}
  }], "resourceName": "projects/field-set-54072/locations/us-central1/functions/api",
  "request": { "updateMask": "sourceUploadUrl,name,labels,runtime,httpsTrigger", "@type": "type.googleapis.com/google.cloud.functions.v1.UpdateFunctionRequest", "function": { "httpsTrigger": {}, "labels": { "deployment-tool": "cli-firebase" }, "sourceUploadUrl": "https://storage.googleapis.com/gcf-upload-us-central1-b626bc0d-fc5f-4fe2-8b30-a29ff3b018be/5fb21867-445e-4ce3-9474-cd8bc47729c8.zip?GoogleAccessId=service-975529024357@gcf-admin-robot.iam.gserviceaccount.com&Expires=1572845544&Signature=Av7UMW3JotD7I9x93Kyqn3b2cB1elpC6oaV%2FcfPkIsuH2KTZRcpSPdX1zCyZGo71ez9RhkDdjpGfojUbO2T0FGYFwQiDJimHk%2BwOfhltX6LlAFlVFcKCVd6ykZs6QvLrgfKIl8kwypnP963TDguLkiENH%2FBtJmvICVanA2zqGWsuSJIaT7Rc8qQ2SfLXpm3mQAtUo8PZaRzeCuLc7%2BXsCCcSG5n0VYOsrWG%2FH8SfIVndJqfOwMj85VXiGrhRQYvbnGrLv13r4xv%2F96ZdzLw0OlF3MxYUDpl4OFeCLuP2hwRk5NhB0JzAZxGSty54I3UKbPZYtySuBD4%2B2%2FwrlblMuA%3D%3D", "runtime": "nodejs8", "name": "projects/field-set-54072/locations/us-central1/functions/api" } }, "resourceLocation": { "currentLocations": ["us-central1"] }
}
