/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createType( 'product_choice_enum', ['passion_test', 'talent_test'] )
    pgm.createType( 'status_enum', ['not_contacted', 'contacted', 'success_closed', 'failed_closed'] )
    pgm.createTable('campaign_conversions', {
        id: 'id',
        name: { type: 'varchar(50)', notNull: true },
        email: { type: 'varchar(100)', notNull: true },
        product_choice: { type: 'product_choice_enum', notNull: true },
        status: { type: 'status_enum', notNull: true },
        notes: { type: 'varchar(1500)', notNull: false },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        lastUpdatedAt: {
            type: 'timestamp',
            notNull: false,
        },
    })
    pgm.addConstraint( 'campaign_conversions', 'email_choice_constraint', { unique: ['email', 'product_choice'] } )
    pgm.createTable('ads_related_visits', {
        id: 'id',
        utm_campaign: { type: 'varchar(300)', notNull: true },
        page_slug: { type: 'varchar(100)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
};

exports.down = pgm => {
    pgm.dropTable( 'ads_related_visits', { ifExists: true } )
    pgm.dropTable( 'campaign_conversions', { ifExists: true } )
    pgm.dropType( 'status_enum' )
    pgm.dropType( 'product_choice_enum' )
};
 