import React from "react";

import { Breadcrumb, Grid, Icon } from "semantic-ui-react";

export default function BreadcrumbComponent({Ruta}) {
  return (
    <Grid className="no-margin">
      <Grid.Column className="background-color-6DA3FC no-margin no-padding-top no-padding-bottom">
        <Breadcrumb style={{ paddingLeft: "4%" }}>
          {Ruta.length > 0 ? (
            Ruta.map((data, index) => {
              // console.log(data);
              return (
                <React.Fragment>
                  <Breadcrumb.Section>
                    {data.onlyicon ? (
                      <React.Fragment>
                        <Icon name="home" className="font-color-FFFFFF" size="small" />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Breadcrumb.Divider className="font-color-FFFFFF font-size-8px">/</Breadcrumb.Divider>
                        <Breadcrumb.Section className="font-family-Montserrat-Regular font-color-FFFFFF font-size-8px">
                          {data.nombre}
                        </Breadcrumb.Section>
                      </React.Fragment>
                    )}
                  </Breadcrumb.Section>
                </React.Fragment>
              );
            })
          ) : (
            <Breadcrumb.Section>
              <Icon name="home" className="font-color-FFFFFF" size="small" />
            </Breadcrumb.Section>
          )}
        </Breadcrumb>
      </Grid.Column>
    </Grid>
  );
}
