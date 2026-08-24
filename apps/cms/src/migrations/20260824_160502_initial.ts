import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_site_settings_footer_social_links_platform" AS ENUM('instagram', 'linkedin', 'facebook', 'email', 'other');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_footer_social_links_platform" AS ENUM('instagram', 'linkedin', 'facebook', 'email', 'other');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_home_page_hero_background_images_column_key" AS ENUM('purple', 'tamarillo', 'granadilla');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_hero_background_images_column_key" AS ENUM('purple', 'tamarillo', 'granadilla');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('es', 'en');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_published_locale" AS ENUM('es', 'en');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_reasons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_reasons_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "products_stats_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"scientific_name" varchar,
  	"accent_color" varchar,
  	"main_image_id" integer,
  	"top_image_id" integer,
  	"bottom_image_id" integer,
  	"bloom_image_id" integer,
  	"arrow_icon_id" integer,
  	"technical_sheet_id" integer,
  	"display_order" numeric DEFAULT 0,
  	"featured_on_homepage" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_stats_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_scientific_name" varchar,
  	"version_accent_color" varchar,
  	"version_main_image_id" integer,
  	"version_top_image_id" integer,
  	"version_bottom_image_id" integer,
  	"version_bloom_image_id" integer,
  	"version_arrow_icon_id" integer,
  	"version_technical_sheet_id" integer,
  	"version_display_order" numeric DEFAULT 0,
  	"version_featured_on_homepage" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"contact_reasons_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_footer_social_links_platform",
  	"url" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "site_settings_footer_social_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_logo_on_dark_id" integer,
  	"brand_logo_on_light_id" integer,
  	"footer_copyright_legal_name" varchar,
  	"footer_dev_credit" varchar,
  	"contact_email" varchar,
  	"contact_website" varchar,
  	"contact_whatsapp_number" varchar,
  	"seo_defaults_og_image_id" integer,
  	"seo_defaults_org_name" varchar,
  	"seo_defaults_org_legal_name" varchar,
  	"seo_defaults_org_address_locality" varchar,
  	"seo_defaults_org_address_country" varchar,
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"header_nav_nosotros" varchar,
  	"header_nav_por_que_elegirnos" varchar,
  	"header_nav_productos" varchar,
  	"header_nav_contacto" varchar,
  	"header_logo_alt" varchar,
  	"header_aria_open_menu" varchar,
  	"header_aria_close_menu" varchar,
  	"header_aria_main_nav" varchar,
  	"footer_description" varchar,
  	"footer_follow_us_label" varchar,
  	"contact_contact_heading" varchar,
  	"contact_location_line" varchar,
  	"contact_whatsapp_message_template" varchar,
  	"seo_defaults_default_title" varchar,
  	"seo_defaults_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_version_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_footer_social_links_platform",
  	"url" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_footer_social_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_brand_logo_on_dark_id" integer,
  	"version_brand_logo_on_light_id" integer,
  	"version_footer_copyright_legal_name" varchar,
  	"version_footer_dev_credit" varchar,
  	"version_contact_email" varchar,
  	"version_contact_website" varchar,
  	"version_contact_whatsapp_number" varchar,
  	"version_seo_defaults_og_image_id" integer,
  	"version_seo_defaults_org_name" varchar,
  	"version_seo_defaults_org_legal_name" varchar,
  	"version_seo_defaults_org_address_locality" varchar,
  	"version_seo_defaults_org_address_country" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_settings_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_header_nav_nosotros" varchar,
  	"version_header_nav_por_que_elegirnos" varchar,
  	"version_header_nav_productos" varchar,
  	"version_header_nav_contacto" varchar,
  	"version_header_logo_alt" varchar,
  	"version_header_aria_open_menu" varchar,
  	"version_header_aria_close_menu" varchar,
  	"version_header_aria_main_nav" varchar,
  	"version_footer_description" varchar,
  	"version_footer_follow_us_label" varchar,
  	"version_contact_contact_heading" varchar,
  	"version_contact_location_line" varchar,
  	"version_contact_whatsapp_message_template" varchar,
  	"version_seo_defaults_default_title" varchar,
  	"version_seo_defaults_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_hero_background_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"column_key" "enum_home_page_hero_background_images_column_key",
  	"zoom" numeric DEFAULT 1,
  	"pan_y" numeric DEFAULT 0
  );
  
  CREATE TABLE "home_page_nosotros_floating_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_nosotros_bloque1_body_fragments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "home_page_nosotros_bloque1_body_fragments_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_nosotros_bloque1_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "home_page_nosotros_bloque1_features_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_nosotros_bloque2_featured_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_nosotros_bloque2_featured_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_por_que_elegirnos_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer
  );
  
  CREATE TABLE "home_page_por_que_elegirnos_cards_locales" (
  	"image_alt" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_beneficios_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "home_page_beneficios_items_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_cta_reason_id" integer,
  	"nosotros_bloque1_featured_image_id" integer,
  	"productos_cta_cotizar_reason_id" integer,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_title_line1" varchar,
  	"hero_title_line2_prefix" varchar,
  	"hero_title_accent" varchar,
  	"hero_subtitle_line1" varchar,
  	"hero_subtitle_line2" varchar,
  	"hero_cta_label" varchar,
  	"nosotros_bloque1_heading_line1" varchar,
  	"nosotros_bloque1_heading_line2" varchar,
  	"nosotros_bloque1_heading_accent" varchar,
  	"nosotros_bloque1_featured_image_alt" varchar,
  	"nosotros_bloque2_compromiso_prefix" varchar,
  	"nosotros_bloque2_compromiso_accent" varchar,
  	"nosotros_bloque2_compromiso_body" varchar,
  	"por_que_elegirnos_heading_prefix" varchar,
  	"por_que_elegirnos_heading_accent" varchar,
  	"por_que_elegirnos_body" varchar,
  	"por_que_elegirnos_caption_text" varchar,
  	"productos_heading" varchar,
  	"productos_subheading" varchar,
  	"productos_cta_ficha_label" varchar,
  	"productos_cta_cotizar_label" varchar,
  	"beneficios_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_hero_background_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"column_key" "enum__home_page_v_version_hero_background_images_column_key",
  	"zoom" numeric DEFAULT 1,
  	"pan_y" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_floating_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_bloque1_body_fragments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_bloque1_body_fragments_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_bloque1_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_bloque1_features_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_bloque2_featured_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_nosotros_bloque2_featured_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_por_que_elegirnos_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_por_que_elegirnos_cards_locales" (
  	"image_alt" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_beneficios_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_beneficios_items_locales" (
  	"title" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_cta_reason_id" integer,
  	"version_nosotros_bloque1_featured_image_id" integer,
  	"version_productos_cta_cotizar_reason_id" integer,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_page_v_locales" (
  	"version_hero_title_line1" varchar,
  	"version_hero_title_line2_prefix" varchar,
  	"version_hero_title_accent" varchar,
  	"version_hero_subtitle_line1" varchar,
  	"version_hero_subtitle_line2" varchar,
  	"version_hero_cta_label" varchar,
  	"version_nosotros_bloque1_heading_line1" varchar,
  	"version_nosotros_bloque1_heading_line2" varchar,
  	"version_nosotros_bloque1_heading_accent" varchar,
  	"version_nosotros_bloque1_featured_image_alt" varchar,
  	"version_nosotros_bloque2_compromiso_prefix" varchar,
  	"version_nosotros_bloque2_compromiso_accent" varchar,
  	"version_nosotros_bloque2_compromiso_body" varchar,
  	"version_por_que_elegirnos_heading_prefix" varchar,
  	"version_por_que_elegirnos_heading_accent" varchar,
  	"version_por_que_elegirnos_body" varchar,
  	"version_por_que_elegirnos_caption_text" varchar,
  	"version_productos_heading" varchar,
  	"version_productos_subheading" varchar,
  	"version_productos_cta_ficha_label" varchar,
  	"version_productos_cta_cotizar_label" varchar,
  	"version_beneficios_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_privacy_policy_url" varchar,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"seo_page_title" varchar,
  	"seo_page_description" varchar,
  	"heading_prefix" varchar,
  	"heading_accent" varchar,
  	"heading_suffix" varchar,
  	"subtext_prefix" varchar,
  	"card_heading" varchar,
  	"form_empresa_label" varchar,
  	"form_nombre_label" varchar,
  	"form_apellidos_label" varchar,
  	"form_email_label" varchar,
  	"form_asunto_label" varchar,
  	"form_comentario_label" varchar,
  	"form_privacy_prefix" varchar,
  	"form_privacy_link_label" varchar,
  	"form_submit_label" varchar,
  	"form_sending_label" varchar,
  	"form_success_message" varchar,
  	"form_error_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_form_privacy_policy_url" varchar,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__contact_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_contact_page_v_locales" (
  	"version_seo_page_title" varchar,
  	"version_seo_page_description" varchar,
  	"version_heading_prefix" varchar,
  	"version_heading_accent" varchar,
  	"version_heading_suffix" varchar,
  	"version_subtext_prefix" varchar,
  	"version_card_heading" varchar,
  	"version_form_empresa_label" varchar,
  	"version_form_nombre_label" varchar,
  	"version_form_apellidos_label" varchar,
  	"version_form_email_label" varchar,
  	"version_form_asunto_label" varchar,
  	"version_form_comentario_label" varchar,
  	"version_form_privacy_prefix" varchar,
  	"version_form_privacy_link_label" varchar,
  	"version_form_submit_label" varchar,
  	"version_form_sending_label" varchar,
  	"version_form_success_message" varchar,
  	"version_form_error_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_reasons_locales" ADD CONSTRAINT "contact_reasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_stats" ADD CONSTRAINT "products_stats_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_stats" ADD CONSTRAINT "products_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_stats_locales" ADD CONSTRAINT "products_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_top_image_id_media_id_fk" FOREIGN KEY ("top_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_bottom_image_id_media_id_fk" FOREIGN KEY ("bottom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_bloom_image_id_media_id_fk" FOREIGN KEY ("bloom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_arrow_icon_id_media_id_fk" FOREIGN KEY ("arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_technical_sheet_id_media_id_fk" FOREIGN KEY ("technical_sheet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_stats" ADD CONSTRAINT "_products_v_version_stats_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_stats" ADD CONSTRAINT "_products_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_stats_locales" ADD CONSTRAINT "_products_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_main_image_id_media_id_fk" FOREIGN KEY ("version_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_top_image_id_media_id_fk" FOREIGN KEY ("version_top_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_bottom_image_id_media_id_fk" FOREIGN KEY ("version_bottom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_bloom_image_id_media_id_fk" FOREIGN KEY ("version_bloom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_arrow_icon_id_media_id_fk" FOREIGN KEY ("version_arrow_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_technical_sheet_id_media_id_fk" FOREIGN KEY ("version_technical_sheet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_reasons_fk" FOREIGN KEY ("contact_reasons_id") REFERENCES "public"."contact_reasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_social_links" ADD CONSTRAINT "site_settings_footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_footer_social_links" ADD CONSTRAINT "site_settings_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_social_links_locales" ADD CONSTRAINT "site_settings_footer_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brand_logo_on_dark_id_media_id_fk" FOREIGN KEY ("brand_logo_on_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brand_logo_on_light_id_media_id_fk" FOREIGN KEY ("brand_logo_on_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_defaults_og_image_id_media_id_fk" FOREIGN KEY ("seo_defaults_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_social_links" ADD CONSTRAINT "_site_settings_v_version_footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_social_links" ADD CONSTRAINT "_site_settings_v_version_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_social_links_locales" ADD CONSTRAINT "_site_settings_v_version_footer_social_links_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_footer_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_brand_logo_on_dark_id_media_id_fk" FOREIGN KEY ("version_brand_logo_on_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_brand_logo_on_light_id_media_id_fk" FOREIGN KEY ("version_brand_logo_on_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_seo_defaults_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_defaults_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_background_images" ADD CONSTRAINT "home_page_hero_background_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_background_images" ADD CONSTRAINT "home_page_hero_background_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_floating_images" ADD CONSTRAINT "home_page_nosotros_floating_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_floating_images" ADD CONSTRAINT "home_page_nosotros_floating_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque1_body_fragments" ADD CONSTRAINT "home_page_nosotros_bloque1_body_fragments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque1_body_fragments_locales" ADD CONSTRAINT "home_page_nosotros_bloque1_body_fragments_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_nosotros_bloque1_body_fragments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque1_features" ADD CONSTRAINT "home_page_nosotros_bloque1_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque1_features" ADD CONSTRAINT "home_page_nosotros_bloque1_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque1_features_locales" ADD CONSTRAINT "home_page_nosotros_bloque1_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_nosotros_bloque1_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque2_featured_images" ADD CONSTRAINT "home_page_nosotros_bloque2_featured_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque2_featured_images" ADD CONSTRAINT "home_page_nosotros_bloque2_featured_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nosotros_bloque2_featured_images_locales" ADD CONSTRAINT "home_page_nosotros_bloque2_featured_images_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_nosotros_bloque2_featured_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_por_que_elegirnos_cards" ADD CONSTRAINT "home_page_por_que_elegirnos_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_por_que_elegirnos_cards" ADD CONSTRAINT "home_page_por_que_elegirnos_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_por_que_elegirnos_cards" ADD CONSTRAINT "home_page_por_que_elegirnos_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_por_que_elegirnos_cards_locales" ADD CONSTRAINT "home_page_por_que_elegirnos_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_por_que_elegirnos_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_beneficios_items" ADD CONSTRAINT "home_page_beneficios_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_beneficios_items" ADD CONSTRAINT "home_page_beneficios_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_beneficios_items_locales" ADD CONSTRAINT "home_page_beneficios_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_beneficios_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_cta_reason_id_contact_reasons_id_fk" FOREIGN KEY ("hero_cta_reason_id") REFERENCES "public"."contact_reasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_nosotros_bloque1_featured_image_id_media_id_fk" FOREIGN KEY ("nosotros_bloque1_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_productos_cta_cotizar_reason_id_contact_reasons_id_fk" FOREIGN KEY ("productos_cta_cotizar_reason_id") REFERENCES "public"."contact_reasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_background_images" ADD CONSTRAINT "_home_page_v_version_hero_background_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_background_images" ADD CONSTRAINT "_home_page_v_version_hero_background_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_floating_images" ADD CONSTRAINT "_home_page_v_version_nosotros_floating_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_floating_images" ADD CONSTRAINT "_home_page_v_version_nosotros_floating_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque1_body_fragments" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque1_body_fragments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque1_body_fragments_locales" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque1_body_fragments_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_nosotros_bloque1_body_fragments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque1_features" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque1_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque1_features" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque1_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque1_features_locales" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque1_features_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_nosotros_bloque1_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque2_featured_images" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque2_featured_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque2_featured_images" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque2_featured_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nosotros_bloque2_featured_images_locales" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque2_featured_images_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_nosotros_bloque2_featured_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_por_que_elegirnos_cards" ADD CONSTRAINT "_home_page_v_version_por_que_elegirnos_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_por_que_elegirnos_cards" ADD CONSTRAINT "_home_page_v_version_por_que_elegirnos_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_por_que_elegirnos_cards" ADD CONSTRAINT "_home_page_v_version_por_que_elegirnos_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_por_que_elegirnos_cards_locales" ADD CONSTRAINT "_home_page_v_version_por_que_elegirnos_cards_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_por_que_elegirnos_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_beneficios_items" ADD CONSTRAINT "_home_page_v_version_beneficios_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_beneficios_items" ADD CONSTRAINT "_home_page_v_version_beneficios_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_beneficios_items_locales" ADD CONSTRAINT "_home_page_v_version_beneficios_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_beneficios_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_cta_reason_id_contact_reasons_id_fk" FOREIGN KEY ("version_hero_cta_reason_id") REFERENCES "public"."contact_reasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_nosotros_bloque1_featured_image_id_media_id_fk" FOREIGN KEY ("version_nosotros_bloque1_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_productos_cta_cotizar_reason_id_contact_reasons_id_fk" FOREIGN KEY ("version_productos_cta_cotizar_reason_id") REFERENCES "public"."contact_reasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_locales" ADD CONSTRAINT "_contact_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_reasons_key_idx" ON "contact_reasons" USING btree ("key");
  CREATE INDEX "contact_reasons_updated_at_idx" ON "contact_reasons" USING btree ("updated_at");
  CREATE INDEX "contact_reasons_created_at_idx" ON "contact_reasons" USING btree ("created_at");
  CREATE UNIQUE INDEX "contact_reasons_locales_locale_parent_id_unique" ON "contact_reasons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_stats_order_idx" ON "products_stats" USING btree ("_order");
  CREATE INDEX "products_stats_parent_id_idx" ON "products_stats" USING btree ("_parent_id");
  CREATE INDEX "products_stats_icon_idx" ON "products_stats" USING btree ("icon_id");
  CREATE UNIQUE INDEX "products_stats_locales_locale_parent_id_unique" ON "products_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_main_image_idx" ON "products" USING btree ("main_image_id");
  CREATE INDEX "products_top_image_idx" ON "products" USING btree ("top_image_id");
  CREATE INDEX "products_bottom_image_idx" ON "products" USING btree ("bottom_image_id");
  CREATE INDEX "products_bloom_image_idx" ON "products" USING btree ("bloom_image_id");
  CREATE INDEX "products_arrow_icon_idx" ON "products" USING btree ("arrow_icon_id");
  CREATE INDEX "products_technical_sheet_idx" ON "products" USING btree ("technical_sheet_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_stats_order_idx" ON "_products_v_version_stats" USING btree ("_order");
  CREATE INDEX "_products_v_version_stats_parent_id_idx" ON "_products_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_stats_icon_idx" ON "_products_v_version_stats" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_products_v_version_stats_locales_locale_parent_id_unique" ON "_products_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_main_image_idx" ON "_products_v" USING btree ("version_main_image_id");
  CREATE INDEX "_products_v_version_version_top_image_idx" ON "_products_v" USING btree ("version_top_image_id");
  CREATE INDEX "_products_v_version_version_bottom_image_idx" ON "_products_v" USING btree ("version_bottom_image_id");
  CREATE INDEX "_products_v_version_version_bloom_image_idx" ON "_products_v" USING btree ("version_bloom_image_id");
  CREATE INDEX "_products_v_version_version_arrow_icon_idx" ON "_products_v" USING btree ("version_arrow_icon_id");
  CREATE INDEX "_products_v_version_version_technical_sheet_idx" ON "_products_v" USING btree ("version_technical_sheet_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_contact_reasons_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_reasons_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_footer_social_links_order_idx" ON "site_settings_footer_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_social_links_parent_id_idx" ON "site_settings_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_social_links_icon_idx" ON "site_settings_footer_social_links" USING btree ("icon_id");
  CREATE UNIQUE INDEX "site_settings_footer_social_links_locales_locale_parent_id_u" ON "site_settings_footer_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_brand_brand_logo_on_dark_idx" ON "site_settings" USING btree ("brand_logo_on_dark_id");
  CREATE INDEX "site_settings_brand_brand_logo_on_light_idx" ON "site_settings" USING btree ("brand_logo_on_light_id");
  CREATE INDEX "site_settings_seo_defaults_seo_defaults_og_image_idx" ON "site_settings" USING btree ("seo_defaults_og_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_social_links_order_idx" ON "_site_settings_v_version_footer_social_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_social_links_parent_id_idx" ON "_site_settings_v_version_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_social_links_icon_idx" ON "_site_settings_v_version_footer_social_links" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_footer_social_links_locales_locale_" ON "_site_settings_v_version_footer_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_brand_version_brand_logo_on_dar_idx" ON "_site_settings_v" USING btree ("version_brand_logo_on_dark_id");
  CREATE INDEX "_site_settings_v_version_brand_version_brand_logo_on_lig_idx" ON "_site_settings_v" USING btree ("version_brand_logo_on_light_id");
  CREATE INDEX "_site_settings_v_version_seo_defaults_version_seo_defaul_idx" ON "_site_settings_v" USING btree ("version_seo_defaults_og_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_background_images_order_idx" ON "home_page_hero_background_images" USING btree ("_order");
  CREATE INDEX "home_page_hero_background_images_parent_id_idx" ON "home_page_hero_background_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_background_images_image_idx" ON "home_page_hero_background_images" USING btree ("image_id");
  CREATE INDEX "home_page_nosotros_floating_images_order_idx" ON "home_page_nosotros_floating_images" USING btree ("_order");
  CREATE INDEX "home_page_nosotros_floating_images_parent_id_idx" ON "home_page_nosotros_floating_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_nosotros_floating_images_image_idx" ON "home_page_nosotros_floating_images" USING btree ("image_id");
  CREATE INDEX "home_page_nosotros_bloque1_body_fragments_order_idx" ON "home_page_nosotros_bloque1_body_fragments" USING btree ("_order");
  CREATE INDEX "home_page_nosotros_bloque1_body_fragments_parent_id_idx" ON "home_page_nosotros_bloque1_body_fragments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_nosotros_bloque1_body_fragments_locales_locale_par" ON "home_page_nosotros_bloque1_body_fragments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_nosotros_bloque1_features_order_idx" ON "home_page_nosotros_bloque1_features" USING btree ("_order");
  CREATE INDEX "home_page_nosotros_bloque1_features_parent_id_idx" ON "home_page_nosotros_bloque1_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_nosotros_bloque1_features_icon_idx" ON "home_page_nosotros_bloque1_features" USING btree ("icon_id");
  CREATE UNIQUE INDEX "home_page_nosotros_bloque1_features_locales_locale_parent_id" ON "home_page_nosotros_bloque1_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_nosotros_bloque2_featured_images_order_idx" ON "home_page_nosotros_bloque2_featured_images" USING btree ("_order");
  CREATE INDEX "home_page_nosotros_bloque2_featured_images_parent_id_idx" ON "home_page_nosotros_bloque2_featured_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_nosotros_bloque2_featured_images_image_idx" ON "home_page_nosotros_bloque2_featured_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_page_nosotros_bloque2_featured_images_locales_locale_pa" ON "home_page_nosotros_bloque2_featured_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_por_que_elegirnos_cards_order_idx" ON "home_page_por_que_elegirnos_cards" USING btree ("_order");
  CREATE INDEX "home_page_por_que_elegirnos_cards_parent_id_idx" ON "home_page_por_que_elegirnos_cards" USING btree ("_parent_id");
  CREATE INDEX "home_page_por_que_elegirnos_cards_image_idx" ON "home_page_por_que_elegirnos_cards" USING btree ("image_id");
  CREATE INDEX "home_page_por_que_elegirnos_cards_icon_idx" ON "home_page_por_que_elegirnos_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "home_page_por_que_elegirnos_cards_locales_locale_parent_id_u" ON "home_page_por_que_elegirnos_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_beneficios_items_order_idx" ON "home_page_beneficios_items" USING btree ("_order");
  CREATE INDEX "home_page_beneficios_items_parent_id_idx" ON "home_page_beneficios_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_beneficios_items_icon_idx" ON "home_page_beneficios_items" USING btree ("icon_id");
  CREATE UNIQUE INDEX "home_page_beneficios_items_locales_locale_parent_id_unique" ON "home_page_beneficios_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_hero_cta_reason_idx" ON "home_page" USING btree ("hero_cta_reason_id");
  CREATE INDEX "home_page_nosotros_bloque1_nosotros_bloque1_featured_ima_idx" ON "home_page" USING btree ("nosotros_bloque1_featured_image_id");
  CREATE INDEX "home_page_productos_productos_cta_cotizar_reason_idx" ON "home_page" USING btree ("productos_cta_cotizar_reason_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_hero_background_images_order_idx" ON "_home_page_v_version_hero_background_images" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_background_images_parent_id_idx" ON "_home_page_v_version_hero_background_images" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_background_images_image_idx" ON "_home_page_v_version_hero_background_images" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_nosotros_floating_images_order_idx" ON "_home_page_v_version_nosotros_floating_images" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_nosotros_floating_images_parent_id_idx" ON "_home_page_v_version_nosotros_floating_images" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_nosotros_floating_images_image_idx" ON "_home_page_v_version_nosotros_floating_images" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_nosotros_bloque1_body_fragments_order_idx" ON "_home_page_v_version_nosotros_bloque1_body_fragments" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_nosotros_bloque1_body_fragments_parent_id_idx" ON "_home_page_v_version_nosotros_bloque1_body_fragments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_nosotros_bloque1_body_fragments_local_1" ON "_home_page_v_version_nosotros_bloque1_body_fragments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_nosotros_bloque1_features_order_idx" ON "_home_page_v_version_nosotros_bloque1_features" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_nosotros_bloque1_features_parent_id_idx" ON "_home_page_v_version_nosotros_bloque1_features" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_nosotros_bloque1_features_icon_idx" ON "_home_page_v_version_nosotros_bloque1_features" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_home_page_v_version_nosotros_bloque1_features_locales_local" ON "_home_page_v_version_nosotros_bloque1_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_nosotros_bloque2_featured_images_order_idx" ON "_home_page_v_version_nosotros_bloque2_featured_images" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_nosotros_bloque2_featured_images_parent_id_idx" ON "_home_page_v_version_nosotros_bloque2_featured_images" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_nosotros_bloque2_featured_images_im_idx" ON "_home_page_v_version_nosotros_bloque2_featured_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_home_page_v_version_nosotros_bloque2_featured_images_locale" ON "_home_page_v_version_nosotros_bloque2_featured_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_por_que_elegirnos_cards_order_idx" ON "_home_page_v_version_por_que_elegirnos_cards" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_por_que_elegirnos_cards_parent_id_idx" ON "_home_page_v_version_por_que_elegirnos_cards" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_por_que_elegirnos_cards_image_idx" ON "_home_page_v_version_por_que_elegirnos_cards" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_por_que_elegirnos_cards_icon_idx" ON "_home_page_v_version_por_que_elegirnos_cards" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_home_page_v_version_por_que_elegirnos_cards_locales_locale_" ON "_home_page_v_version_por_que_elegirnos_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_beneficios_items_order_idx" ON "_home_page_v_version_beneficios_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_beneficios_items_parent_id_idx" ON "_home_page_v_version_beneficios_items" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_beneficios_items_icon_idx" ON "_home_page_v_version_beneficios_items" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_home_page_v_version_beneficios_items_locales_locale_parent_" ON "_home_page_v_version_beneficios_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_cta_reason_idx" ON "_home_page_v" USING btree ("version_hero_cta_reason_id");
  CREATE INDEX "_home_page_v_version_nosotros_bloque1_version_nosotros_b_idx" ON "_home_page_v" USING btree ("version_nosotros_bloque1_featured_image_id");
  CREATE INDEX "_home_page_v_version_productos_version_productos_cta_cot_idx" ON "_home_page_v" USING btree ("version_productos_cta_cotizar_reason_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_snapshot_idx" ON "_home_page_v" USING btree ("snapshot");
  CREATE INDEX "_home_page_v_published_locale_idx" ON "_home_page_v" USING btree ("published_locale");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_home_page_v_locales_locale_parent_id_unique" ON "_home_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_snapshot_idx" ON "_contact_page_v" USING btree ("snapshot");
  CREATE INDEX "_contact_page_v_published_locale_idx" ON "_contact_page_v" USING btree ("published_locale");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_contact_page_v_locales_locale_parent_id_unique" ON "_contact_page_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "contact_reasons" CASCADE;
  DROP TABLE "contact_reasons_locales" CASCADE;
  DROP TABLE "products_stats" CASCADE;
  DROP TABLE "products_stats_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "_products_v_version_stats" CASCADE;
  DROP TABLE "_products_v_version_stats_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_footer_social_links" CASCADE;
  DROP TABLE "site_settings_footer_social_links_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_social_links" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_social_links_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TABLE "home_page_hero_background_images" CASCADE;
  DROP TABLE "home_page_nosotros_floating_images" CASCADE;
  DROP TABLE "home_page_nosotros_bloque1_body_fragments" CASCADE;
  DROP TABLE "home_page_nosotros_bloque1_body_fragments_locales" CASCADE;
  DROP TABLE "home_page_nosotros_bloque1_features" CASCADE;
  DROP TABLE "home_page_nosotros_bloque1_features_locales" CASCADE;
  DROP TABLE "home_page_nosotros_bloque2_featured_images" CASCADE;
  DROP TABLE "home_page_nosotros_bloque2_featured_images_locales" CASCADE;
  DROP TABLE "home_page_por_que_elegirnos_cards" CASCADE;
  DROP TABLE "home_page_por_que_elegirnos_cards_locales" CASCADE;
  DROP TABLE "home_page_beneficios_items" CASCADE;
  DROP TABLE "home_page_beneficios_items_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "_home_page_v_version_hero_background_images" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_floating_images" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_bloque1_body_fragments" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_bloque1_body_fragments_locales" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_bloque1_features" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_bloque1_features_locales" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_bloque2_featured_images" CASCADE;
  DROP TABLE "_home_page_v_version_nosotros_bloque2_featured_images_locales" CASCADE;
  DROP TABLE "_home_page_v_version_por_que_elegirnos_cards" CASCADE;
  DROP TABLE "_home_page_v_version_por_que_elegirnos_cards_locales" CASCADE;
  DROP TABLE "_home_page_v_version_beneficios_items" CASCADE;
  DROP TABLE "_home_page_v_version_beneficios_items_locales" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_locales" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "_contact_page_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_site_settings_footer_social_links_platform";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_footer_social_links_platform";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum__site_settings_v_published_locale";
  DROP TYPE "public"."enum_home_page_hero_background_images_column_key";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_hero_background_images_column_key";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum__home_page_v_published_locale";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum__contact_page_v_published_locale";`)
}
