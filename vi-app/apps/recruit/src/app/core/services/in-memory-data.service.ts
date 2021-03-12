/**
 * Hero-oriented InMemoryDbService with method overrides.
 */
import { Injectable } from '@angular/core';
import * as data from '@vi/db';

import {
  RequestInfo,
  RequestInfoUtilities,
  ParsedRequestUrl
} from 'angular-in-memory-web-api';

/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService {
  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;
  maxId = 0;

  /** In-memory database data */
  db: Db = {};

  /** Create the in-memory database on start or by command */
  createDb(reqInfo?: RequestInfo) {
    this.db = getDbData();

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        // tslint:disable-next-line:forin
        for (const coll in this.db) {
          this.db[coll].length = 0;
        }
      }

      this.active = !!body.active;
    }
    return this.db;
  }

  /**
   * Simulate generating new Id on the server
   * All collections in this db have numeric ids.
   * Seed grows by highest id seen in any of the collections.
   */
  genId(collection: { id: number }[], collectionName: string) {
    this.maxId =
      1 +
      collection.reduce((prev, cur) => Math.max(prev, cur.id || 0), this.maxId);
    return this.maxId;
  }

  /**
   * Override `parseRequestUrl`
   * Manipulates the request URL or the parsed result.
   * If in-mem is inactive, clear collectionName so that service passes request thru.
   * If in-mem is active, after parsing with the default parser,
   * @param url from request URL
   * @param utils for manipulating parsed URL
   */
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const parsed = utils.parseRequestUrl(url);
    const isDefaultRoot = parsed.apiBase === 'api/';
    parsed.collectionName =
      this.active && isDefaultRoot
        ? mapCollectionName(parsed.collectionName)
        : undefined;
    return parsed;
  }

  // HTTP POST interceptor
  post(reqInfo: RequestInfo) {
    // if client pinged api/authentication
    //  then call authenticate (defined below)
    if (reqInfo.collectionName === 'login') return this.authenticate(reqInfo);

    //  otherwise default response of In-memory DB
    return undefined;
  }

  patch(requestInfo: RequestInfo) {
    return null;
    // const body = requestInfo;
    // const responseOptions = {
    //   headers: requestInfo.headers,
    //   url: requestInfo.url,
    //   body,
    //   status: 201,
    //   statusText: 'getStatusText(STATUS.OK)'
    // };
    // return requestInfo.utils.createResponse$(() => responseOptions);
  }

  // mocking authentication happens here
  // HTTP POST interceptor handler
  authenticate(reqInfo: RequestInfo) {
    // return an Observable response
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP POST api/authentication override');

      const { headers, url, req } = reqInfo;
      const { userName, password } = req['body'];
      if (
        this.db.users.filter(
          u => u.userName === userName && u.password === password
        ).length > 0
      ) {
        return {
          status: 200,
          headers,
          url,
          body: {
            userName,
            bearerToken:
              // eslint-disable-next-line max-len
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            isAuthenticated: true,
            claims: []
          }
        };
      }

      //  otherwise return response with status code 401 (unauthorized)
      return {
        status: 401,
        headers,
        url,
        body: {
          userName,
          bearerToken: null,
          isAuthenticated: false,
          claims: []
        }
      };
    });
  }
}

/**
 * Remap a known singular collection name ("hero")
 * to the plural collection name ("heroes"); else return the name
 * @param name - collection name from the parsed URL
 */
function mapCollectionName(name: string): string {
  return (
    ({
      hero: 'heroes',
      villain: 'villains',
      student: 'students'
    } as any)[name] || name
  );
}

/**
 * Development data
 */
function getDbData() {
  // const heroes = data.heroes.map(item =>
  //   Object.assign(item, (item.name = '_m_' + item.name))
  // );
  // const villains = data.villains.map(item =>
  //   Object.assign(item, (item.name = '_m_' + item.name))
  // );
  // const students = data.students.map(item =>
  //   Object.assign(item, (item.firstName = '_m_' + item.firstName))
  // );
  const heroes = data.heroes;
  const villains = data.villains;
  const students = data.students;

  return { heroes, villains, students, users: data.users } as Db;
}
