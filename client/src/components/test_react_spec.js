import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from '@cypress/react'
import AddPatientForm from './addPatientForm.jsx'

const floors = [
  {
    "Rooms": [
      {
        "Beds": [
          {
            "Patient": null,
            "RoomUuid": "99f285d7-a47f-4206-bf47-a559325694e8",
            "createdAt": "2021-01-02T23:22:10.392Z",
            "number": "B",
            "updatedAt": "2021-01-02T23:22:10.420Z",
            "uuid": "dd2bfec2-5f17-4dd2-918d-700e2a994ee2"
          },
          {
            "Patient": null,
            "RoomUuid": "99f285d7-a47f-4206-bf47-a559325694e8",
            "createdAt": "2021-01-02T23:22:10.392Z",
            "number": "A",
            "updatedAt": "2021-01-02T23:22:10.420Z",
            "uuid": "df433516-7e2c-4836-9e86-24a7df1a251"
          }
        ],
        "FloorUuid": "8d8c5650-0f43-4711-9e44-ddde3de87924",
        "createdAt": "2021-01-02T23:22:10.377Z",
        "number": "1",
        "updatedAt": "2021-01-02T23:22:10.419Z",
        "uuid": "99f285d7-a47f-4206-bf47-a559325694e8"
      },
      {
        "Beds": [
          {
            "Patient": null,
            "RoomUuid": "c1018815-0f8b-4316-9bd3-50b4f1192c00",
            "createdAt": "2021-01-02T23:22:10.392Z",
            "number": "C",
            "updatedAt": "2021-01-02T23:22:10.420Z",
            "uuid": "2db9f2ac-2470-46e2-8e2f-db165c4ba9e2"
          },
          {
            "Patient": null,
            "RoomUuid": "c1018815-0f8b-4316-9bd3-50b4f1192c00",
            "createdAt": "2021-01-02T23:22:10.392Z",
            "number": "D",
            "updatedAt": "2021-01-02T23:22:10.420Z",
            "uuid": "4e28f07a-1735-47d5-9894-8753cdcaa603"
          }
        ],
        "FloorUuid": "8d8c5650-0f43-4711-9e44-ddde3de87924",
        "createdAt": "2021-01-02T23:22:10.377Z",
        "number": "2",
        "updatedAt": "2021-01-02T23:22:10.419Z",
        "uuid": "c1018815-0f8b-4316-9bd3-50b4f1192c00"
      }
    ],
    "createdAt": "2021-01-02T23:22:10.356Z",
    "number": 1,
    "updatedAt": "2021-01-02T23:22:10.356Z",
    "uuid": "8d8c5650-0f43-4711-9e44-ddde3de87924"
  }
]

describe('Test React Test', () => {
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Mounts', () => {
    mount(
      <AddPatientForm floors={floors} updateFloors={() => null} />,
      { React, ReactDOM }
    )

    cy.contains('Add Patient').should('be.visible')
  })

  it('Adds name input to form state', () => {
    cy.get('#name')
      .type('Roberto')
      .should('have.value', 'Roberto')
  })

  it('Shows the error with no name', () => {
    mount(
      <AddPatientForm floors={floors} updateFloors={() => null} />,
      { React, ReactDOM }
    )

    cy.get('#gender').select('male')
    cy.get('.avail-bed').first().click()

    cy.contains('Add New Patient').click()
    cy.contains('All fields need to be filled in.')
  })

  it('Shows the error with no gender', () => {
    mount(
      <AddPatientForm floors={floors} updateFloors={() => null} />,
      { React, ReactDOM }
    )

    cy.get('#name').type('Roberto')
    cy.get('.avail-bed').first().click()

    cy.contains('Add New Patient').click()
    cy.contains('All fields need to be filled in.')
  })

  it('Shows the error with no bed selected', () => {
    mount(
      <AddPatientForm floors={floors} updateFloors={() => null} />,
      { React, ReactDOM }
    )

    cy.get('#name').type('Roberto')
    cy.get('#gender').select('male')

    cy.contains('Add New Patient').click()
    cy.contains('All fields need to be filled in.')
  })

  it('Fires when all fields are filled', () => {
    mount(
      <AddPatientForm floors={floors} updateFloors={() => console.log('success')} />,
      { React, ReactDOM }
    )

    cy.get('#name').type('Roberto')
    cy.get('#gender').select('male')
    cy.get('.avail-bed').first().click()

    cy.contains('Add New Patient').click()

  })
})