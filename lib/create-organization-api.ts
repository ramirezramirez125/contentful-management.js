import { AxiosInstance } from 'axios'
import { get } from 'lodash'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { TeamMembershipProps } from './entities/team-membership'
import { TeamProps } from './entities/team'
import { OrganizationInvitationProps } from './entities/organization-invitation'
import { QueryOptions } from './common-types'
import { AppDefinitionProps } from './entities/app-definition'

export type ContentfulOrganizationAPI = ReturnType<typeof createOrganizationApi>

/**
 * Creates API object with methods to access the Organization API
 */
export default function createOrganizationApi({ http }: { http: AxiosInstance }) {
  const { wrapAppDefinition, wrapAppDefinitionCollection } = entities.appDefinition
  const { wrapUser, wrapUserCollection } = entities.user
  const {
    wrapOrganizationMembership,
    wrapOrganizationMembershipCollection,
  } = entities.organizationMembership
  const { wrapTeamMembership, wrapTeamMembershipCollection } = entities.teamMembership
  const {
    wrapTeamSpaceMembership,
    wrapTeamSpaceMembershipCollection,
  } = entities.teamSpaceMembership
  const { wrapTeam, wrapTeamCollection } = entities.team
  const { wrapSpaceMembership, wrapSpaceMembershipCollection } = entities.spaceMembership
  const { wrapOrganizationInvitation } = entities.organizationInvitation

  const headers = { 'x-contentful-enable-alpha-feature': 'organization-user-management-api' }

  return {
    /**
     * Gets a User
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUser(id: string) {
      return http.get('users/' + id).then((response) => wrapUser(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Users in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUsers())
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUsers(query: QueryOptions = {}) {
      return http
        .get('users', createRequestConfig({ query }))
        .then((response) => wrapUserCollection(http, response.data), errorHandler)
    },
    /**
     * Gets an Organization Membership
     * @param id - Organization Membership ID
     * @return Promise for an Organization Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMembership('organizationMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationMembership(id: string) {
      return http
        .get('organization_memberships/' + id)
        .then((response) => wrapOrganizationMembership(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Organization Memberships
     * @param  query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Organization Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationMemberships(query: QueryOptions = {}) {
      return http
        .get('organization_memberships', createRequestConfig({ query }))
        .then((response) => wrapOrganizationMembershipCollection(http, response.data), errorHandler)
    },
    /**
     * Creates a Team
     * @param Object representation of the Team to be created
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createTeam({
     *    name: 'new team',
     *    description: 'new team description'
     *  }))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    createTeam(data: Omit<TeamProps, 'sys'>) {
      return http
        .post('teams', data)
        .then((response) => wrapTeam(http, response.data), errorHandler)
    },
    /**
     * Gets an Team
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeam('teamId'))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    getTeam(teamId: string) {
      return http
        .get('teams/' + teamId)
        .then((response) => wrapTeam(http, response.data), errorHandler)
    },
    /**
     * Gets all Teams in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeams())
     * .then((teams) => console.log(teams))
     * .catch(console.error)
     * ```
     */
    getTeams(query: QueryOptions = {}) {
      return http
        .get('teams', createRequestConfig({ query }))
        .then((response) => wrapTeamCollection(http, response.data), errorHandler)
    },
    /**
     * Creates a Team membership
     * @param data - Object representation of the Team Membership to be created
     * @return Promise for the newly created TeamMembership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((org) => org.createTeamMembership('teamId', {
     *    admin: true,
     *    organizationMembershipId: 'organizationMembershipId'
     *  }))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    createTeamMembership(teamId: string, data: Omit<TeamMembershipProps, 'sys'>) {
      return http
        .post('teams/' + teamId + '/team_memberships', data)
        .then((response) => wrapTeamMembership(http, response.data), errorHandler)
    },
    /**
     * Gets an Team Membership from the team with given teamId
     * @return Promise for an Team Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMembership('teamId', 'teamMembership_id'))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    getTeamMembership(teamId: string, teamMembershipId: string) {
      return http
        .get('teams/' + teamId + '/team_memberships/' + teamMembershipId)
        .then((response) => wrapTeamMembership(http, response.data), errorHandler)
    },
    /**
     * Get all Team Memberships. If teamID is provided in the optional config object, it will return all Team Memberships in that team. By default, returns all team memberships for the organization.
     * @return Promise for a Team Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMemberships('teamId'))
     * .then((teamMemberships) => console.log(teamMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamMemberships(opts: { teamId?: string; query?: QueryOptions } = {}) {
      const query = get(opts, 'query', {})
      if (opts.teamId) {
        return http
          .get('teams/' + opts.teamId + '/team_memberships', createRequestConfig({ query }))
          .then((response) => wrapTeamMembershipCollection(http, response.data), errorHandler)
      }
      return http
        .get('team_memberships', createRequestConfig({ query }))
        .then((response) => wrapTeamMembershipCollection(http, response.data), errorHandler)
    },
    /**
     * Get all Team Space Memberships. If teamID is provided in the optional config object, it will return all Team Space Memberships in that team. By default, returns all team space memberships across all teams in the organization.
     * @return Promise for a Team Space Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMemberships('teamId'))
     * .then((teamSpaceMemberships) => console.log(teamSpaceMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships(opts: { teamId?: string; query?: QueryOptions } = {}) {
      const query = get(opts, 'query', {})
      if (opts.teamId) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        query['sys.team.sys.id'] = opts.teamId
      }
      return http
        .get('team_space_memberships', createRequestConfig({ query }))
        .then((response) => wrapTeamSpaceMembershipCollection(http, response.data), errorHandler)
    },
    /**
     * Get a Team Space Membership with given teamSpaceMembershipId
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMembership('teamSpaceMembershipId'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)]
     * ```
     */
    getTeamSpaceMembership(teamSpaceMembershipId: string) {
      return http
        .get('team_space_memberships/' + teamSpaceMembershipId)
        .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Gets an Space Membership in Organization
     * @param id - Organiztion Space Membership ID
     * @return Promise for a Space Membership in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMembership('organizationSpaceMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMembership(id: string) {
      return http
        .get('space_memberships/' + id)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Gets a collection Space Memberships in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a Space Membership collection across all spaces in the organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMemberships()) // you can add queries like 'limit': 100
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMemberships(query: QueryOptions = {}) {
      return http
        .get('space_memberships', createRequestConfig({ query }))
        .then((response) => wrapSpaceMembershipCollection(http, response.data), errorHandler)
    },
    /**
     * Gets an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((organization) => organization.getOrganizationInvitation('invitation_id'))
     * .then((invitation) => console.log(invitation))
     * .catch(console.error)
     * ```
     */
    getOrganizationInvitation(invitationId: string) {
      return http
        .get('invitations/' + invitationId, {
          headers,
        })
        .then((response) => wrapOrganizationInvitation(http, response.data), errorHandler)
    },
    /**
     * Create an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     *  .then((organization) => organization.createOrganizationInvitation({
     *    email: 'user.email@example.com'
     *    firstName: 'User First Name'
     *    lastName: 'User Last Name'
     *    role: 'developer'
     *  })
     * .catch(console.error)
     * ```
     */
    createOrganizationInvitation(data: Omit<OrganizationInvitationProps, 'sys'>) {
      const invitationAlphaHeaders = {
        'x-contentful-enable-alpha-feature': 'pending-org-membership',
      }

      return http
        .post('invitations', data, { headers: invitationAlphaHeaders })
        .then((response) => wrapOrganizationInvitation(http, response.data), errorHandler)
    },
    /**
     * Creates an app definition
     * @param Object representation of the App Definition to be created
     * @return Promise for the newly created AppDefinition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppDefinition({
     *    name: 'Example app',
     *    locations: [{ location: 'app-config' }],
     *    src: "http://my-app-host.com/my-app"
     *  }))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    createAppDefinition(data: Omit<AppDefinitionProps, 'sys'>) {
      return http
        .post('app_definitions', data)
        .then((response) => wrapAppDefinition(http, response.data), errorHandler)
    },
    /**
     * Gets all app definitions
     * @return Promise for a collection of App Definitions
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinitions())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppDefinitions(query: QueryOptions = {}) {
      return http
        .get('app_definitions', createRequestConfig({ query }))
        .then((response) => wrapAppDefinitionCollection(http, response.data), errorHandler)
    },

    /**
     * Gets an app definition
     * @return Promise for an App Definition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_definition_id>'))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    getAppDefinition(id: string) {
      return http
        .get('app_definitions/' + id)
        .then((response) => wrapAppDefinition(http, response.data), errorHandler)
    },
  }
}
