// This file is part of InvenioRDM
// Copyright (C) 2022 CERN.
//
// Invenio RDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { i18next } from "@translations/invenio_app_rdm/i18next";
import _get from "lodash/get";
import _truncate from "lodash/truncate";
import React, { Component } from "react";
import Overridable from "react-overridable";
import { SearchItemCreators } from "../utils";
import PropTypes from "prop-types";
import { Item, Label, Icon } from "semantic-ui-react";

class RecordsResultsListItem extends Component {
  render() {
    const { currentQueryState, result, key } = this.props;

    const accessStatusId = _get(result, "ui.access_status.id", "open");
    const accessStatus = _get(result, "ui.access_status.title_l10n", "Open");
    const accessStatusIcon = _get(result, "ui.access_status.icon", "unlock");
    const createdDate = _get(
      result,
      "ui.created_date_l10n_long",
      "No creation date found."
    );
    const creators = result.ui.creators.creators.slice(0, 3);

    const descriptionStripped = _get(
      result,
      "ui.description_stripped",
      "No description"
    );

    const publicationDate = _get(
      result,
      "ui.publication_date_l10n_long",
      "No publication date found."
    );
    const resourceType = _get(
      result,
      "ui.resource_type.title_l10n",
      "No resource type"
    );
    const subjects = _get(result, "ui.subjects", []);
    const title = _get(result, "metadata.title", "No title");
    const version = _get(result, "ui.version", null);
    const versions = _get(result, "versions");

    const filters = currentQueryState && Object.fromEntries(currentQueryState.filters);
    const allVersionsVisible = filters?.allversions;
    const numOtherVersions = versions.index - 1;

    // Derivatives
    const viewLink = `/records/${result.id}`;
    return (
      <Overridable
        id="InvenioAppRdm.RecordsResultsListItem.layout"
        result={result}
        key={key}
        accessStatusId={accessStatusId}
        accessStatus={accessStatus}
        accessStatusIcon={accessStatusIcon}
        createdDate={createdDate}
        creators={creators}
        descriptionStripped={descriptionStripped}
        publicationDate={publicationDate}
        resourceType={resourceType}
        subjects={subjects}
        title={title}
        version={version}
        versions={versions}
        allVersionsVisible={allVersionsVisible}
        numOtherVersions={numOtherVersions}
      >
        <Item key={key ?? result.id}>
          <Item.Content>
            <Item.Extra className="labels-actions">
              <Label size="tiny" className="primary">
                {publicationDate} ({version})
              </Label>
              <Label size="tiny" className="neutral">
                {resourceType}
              </Label>
              <Label size="tiny" className={`access-status ${accessStatusId}`}>
                {accessStatusIcon && <Icon name={accessStatusIcon} />}
                {accessStatus}
              </Label>
            </Item.Extra>
            <Item.Header as="h2">
              <a href={viewLink}>{title}</a>
            </Item.Header>
            <Item className="creatibutors">
              <SearchItemCreators creators={creators} />
            </Item>
            <Item.Description>
              {_truncate(descriptionStripped, { length: 350 })}
            </Item.Description>
            <Item.Extra>
              {subjects.map((subject) => (
                <Label key={subject.title_l10n} size="tiny">
                  {subject.title_l10n}
                </Label>
              ))}
              {createdDate && (
                <p>
                  <small>
                    {i18next.t("Uploaded on")} <span>{createdDate}</span>
                  </small>
                </p>
              )}
              {!allVersionsVisible && versions.index > 1 && (
                <p>
                  <small>
                    <b>
                      {numOtherVersions} more{" "}
                      {numOtherVersions > 1 ? "versions" : "version"} exist for this
                      record
                    </b>
                  </small>
                </p>
              )}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Overridable>
    );
  }
}

RecordsResultsListItem.propTypes = {
  currentQueryState: PropTypes.object,
  result: PropTypes.object.isRequired,
  key: PropTypes.string,
};

RecordsResultsListItem.defaultProps = {
  key: null,
  currentQueryState: null,
};

export default Overridable.component("RecordsResultsListItem", RecordsResultsListItem);
